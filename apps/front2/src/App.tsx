import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="text-5xl text-primary font-bold underline">
        Vite + React + Tailwind + Typescript <ModeToggle />
      </h1>
    </ThemeProvider>
  );
}

export default App;
