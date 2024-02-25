import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useGetIdentity } from '@refinedev/core';
import {
  Layout as AntdLayout,
  Avatar,
  Flex,
  Space,
  Typography,
  theme,
} from 'antd';
import React, { useContext } from 'react';
import { LanguageSelect } from '../language-select';
import { User } from 'src/types';
import { UserOutlined } from '@ant-design/icons';
import { ThemeSwitchButton } from '../theme-switch-button';
import { ColorModeContext } from 'src/contexts/color-mode';

const { Text } = Typography;
const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<User>();
  const { mode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0px 24px',
    height: '64px',
  };

  if (sticky) {
    headerStyles.position = 'sticky';
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Flex align="center" gap={24}>
        <LanguageSelect />
        <ThemeSwitchButton />
        <Space size="middle">
          {user?.email && <Text strong>{user.email}</Text>}
          {user?.avatar ? (
            <Avatar src={user.avatar} />
          ) : (
            <Avatar
              style={{
                color: mode === 'light' ? 'black' : 'white',
                backgroundColor: token.colorBgTextHover,
              }}
              icon={<UserOutlined />}
            />
          )}
        </Space>
      </Flex>
    </AntdLayout.Header>
  );
};
