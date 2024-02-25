import { Button } from 'antd';
import { useStyles } from './styled';
import { useContext } from 'react';
import { ColorModeContext } from 'src/contexts/color-mode';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export const ThemeSwitchButton = () => {
  const { styles } = useStyles();
  const { mode, setMode } = useContext(ColorModeContext);

  return (
    <Button
      className={styles.themeSwitch}
      type="text"
      icon={mode === 'light' ? <MoonOutlined /> : <SunOutlined />}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    />
  );
};
