import { ConfigProvider, theme } from "antd";
import { useLightDark } from "./useLightDark.jsx";

export default function AntdThemeWrapper({ children }) {
  const { dark } = useLightDark();

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#258cf4",
          colorBgBase: dark ? "#101922" : "#ffffff",
          colorTextBase: dark ? "#ffffff" : "#0f172a",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
