import { useGetLocale, useSetLocale } from '@refinedev/core';
import { Select } from 'antd';
import ilFlag from 'src/assets/icons/il-flag.svg';
import usFlag from 'src/assets/icons/us-flag.svg';

export const LanguageSelect = () => {
  const changeLanguage = useSetLocale();
  const getLocale = useGetLocale();

  return (
    <Select
      value={getLocale()}
      style={{ width: 60 }}
      onChange={(newVal) => changeLanguage(newVal)}
      options={[
        { label: <img src={usFlag} />, value: 'en' },
        { label: <img src={ilFlag} />, value: 'he' },
      ]}
    />
  );
};
