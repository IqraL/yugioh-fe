// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./components/Auth/LoginPage";
import { AppWrapper } from "./AppWrapper";
import { AuthCodePage } from "./components/Auth/AuthCodePage";
import { Sets } from "./components/Sets";
import { ValidateToken } from "./components/Auth/ValidateToken";

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
              <Sets />
            </ValidateToken>
          }
        />
        <Route
          path="/"
          element={
            <ValidateToken>
              <AppWrapper />
            </ValidateToken>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
