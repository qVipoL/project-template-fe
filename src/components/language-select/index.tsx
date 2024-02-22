import { useGetLocale, useSetLocale } from "@refinedev/core";
import { Select } from "antd";

export const LanguageSelect = () => {
  const changeLanguage = useSetLocale();
  const getLocale = useGetLocale();

  return (
    <Select
      value={getLocale()}
      style={{ width: 60 }}
      onChange={(newVal) => changeLanguage(newVal)}
      options={[
        { label: "🇺🇸", value: "en" },
        { label: "🇮🇱", value: "he" },
      ]}
    />
  );
};
