import { useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";

import "./App.css";

import Landing from "./pages/landing";
import LawyerSignup from "./pages/lawyer/signup";
import ClientSignup from "./pages/client/signup";
import Signin from "./pages/lawyer/signin";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import FourOhFour from "./pages/404";
import ClientDashboard from "./pages/client/dashboard";
import LawyerDashboard from "./pages/lawyer/dashboard";
import Onboarding from "./pages/lawyer/onboarding";
import SplashScreen from "./pages/splashScreen";

import { refresh } from "./data/controller";

import { userStore } from "./stores";

function App() {
  const user = userStore((state) => state.user);
  const storeUser = userStore((state) => state.storeUser);
  const removeUser = userStore((state) => state.removeUser);
  const isLoadingUser = userStore((state) => state.isLoadingUser);
  const setIsLoadingUser = userStore((state) => state.setIsLoadingUser);

  useEffect(() => {
    if (!user) {
      setIsLoadingUser(true);
      refresh().then((response) => {
        setIsLoadingUser(false);
        if (response.status === "success") {
          storeUser(response.data.user);
        } else {
          removeUser();
        }
      });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    window.addEventListener("offline", () => {
      toast.error("it seems you're offline");
    });
    window.addEventListener("online", () => {
      toast.success("you're back online!");
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lawyer-signup" element={<LawyerSignup />} />
        <Route path="/client-signup" element={<ClientSignup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        {user?.role === "client" && (
          <>
            <Route path="/dashboard/*" element={<ClientDashboard />} />
          </>
        )}
        {user?.role === "lawyer" && (
          <>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard/*" element={<LawyerDashboard />} />
          </>
        )}
        {!user && isLoadingUser && (
          <Route path="*" element={<SplashScreen />} />
        )}
        {!user && !isLoadingUser && <Route path="*" element={<FourOhFour />} />}
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </Router>
  );
}

export default App;
