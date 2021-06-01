import React from "react";
import Routes from "../src/components/Routes";
import SideNavigation from "./components/sideNavigation";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="flexible-content">
          <SideNavigation />
          <main id="content" className="p-5">
            <Routes />
          </main>
        </div>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
