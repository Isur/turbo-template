import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "./components/theme-provider";

const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
};

export default App;
