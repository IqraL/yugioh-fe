// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { LoginPage } from "./components/Auth/LoginPage";
import { AppWrapper } from "./AppWrapper";
import { AuthCodePage } from "./components/Auth/AuthCodePage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthCodePage />} />
        <Route path="/" element={<AppWrapper />} />
      </Routes>
    </Router>
  );
}


export default App;
