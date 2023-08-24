import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./utility/UserProvider";
import PrivateRoute from "./utility/PrivateRoute";
import LandingPage from "./components/LandingPage";
import ConfirmInfo from "./components/ConfirmInfo";
import HomePage from "./components/HomePage";
import DetailedHaunt from "./components/DetailedHaunt";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/confirminfo"
            element={
              <PrivateRoute>
                <ConfirmInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/haunt/:id" element={<DetailedHaunt />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
