import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  themeSwitch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: token.colorBgTextHover,
  },
}));
