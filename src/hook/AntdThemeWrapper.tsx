import { ConfigProvider, theme } from "antd";
import { useLightDark } from "./useLightDark";

export default function AntdThemeWrapper({ children }) {
  const { dark } = useLightDark();

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#0f9f8c",
          colorBgBase: dark ? "#0d1116" : "#ffffff",
          colorTextBase: dark ? "#ffffff" : "#0f172a",
        },
         components: {
          Card: {
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
