import "./App.css";
import Router from "./Pages/Router";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (navigator.appVersion.includes("Windows")) {
      document.querySelector("html").style.fontSize = ".8rem";
    }
  }, []);

  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Router />
      </SnackbarProvider>
    </div>
  );
}

export default App;
