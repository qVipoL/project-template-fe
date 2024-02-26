import { AuthPage } from '../../components/pages/auth';

export const Login = () => {
  return (
    <AuthPage
      title={false}
      type="login"
      rememberMe={false}
      forgotPasswordLink={false}
      formProps={{}}
    />
  );
};
