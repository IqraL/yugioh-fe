// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./components/Auth/LoginPage";
import { AppWrapper } from "./AppWrapper";
import { AuthCodePage } from "./components/Auth/AuthCodePage";
import { Sets } from "./components/Sets";
import { ValidateToken } from "./components/Auth/ValidateToken";
import { NavigationColumn } from "./components/NavigationColumn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthCodePage />} />
        <Route
          path="/sets"
          element={
            <ValidateToken>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 7fr",
                  gap: 10,
                }}
              >
                <NavigationColumn />
                <div>
                  <Sets />
                </div>
              </div>
            </ValidateToken>
          }
        />
        <Route
          path="/"
          element={
            <ValidateToken>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 7fr",
                  gap: 10,
                }}
              >
                <NavigationColumn />
                <div>
                  <AppWrapper />
                </div>
              </div>
            </ValidateToken>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
