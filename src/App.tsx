import { Authenticated, I18nProvider, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { ColorModeContextProvider } from './contexts/color-mode';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { authProvider } from './providers/auth-provider';
import { UserCreate, UserEdit, UserList } from './pages/user';
import { apiInstance } from './api/api';
import dataProvider from '@refinedev/simple-rest';
import { accessControlProvider } from './providers/access-control-provider';
import { Home } from './pages/home';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { config } from './config';

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    // @ts-ignore
    translate: (key: string, defaultMessage?: string) => t(key, defaultMessage),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider language={i18n.language}>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(config.BASE_URL, apiInstance)}
                accessControlProvider={accessControlProvider}
                i18nProvider={i18nProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: 'home',
                    list: '/',
                    meta: {
                      icon: <HomeOutlined />,
                      label: t('home.home'),
                    },
                  },
                  {
                    name: 'user',
                    list: '/user',
                    create: '/user/create',
                    edit: '/user/edit/:id',
                    meta: {
                      canDelete: true,
                      icon: <UserOutlined />,
                      label: t('user.users'),
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'LScVZJ-FlAi2M-DQYZaA',
                }}
              >
                <Routes>
                  {/* Main routes */}
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              text={t('general.projectName')}
                              collapsed={collapsed}
                            />
                          )}
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path="/user">
                      <Route
                        element={
                          <UserList>
                            <Outlet />
                          </UserList>
                        }
                      >
                        <Route index element={null} />
                        <Route path="create" element={<UserCreate />} />
                      </Route>
                      <Route path="edit/:id" element={<UserEdit />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  {/* Auth routes */}
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
