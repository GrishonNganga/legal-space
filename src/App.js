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
import Flutterwave from "./pages/lawyer/flutterwave";

import { refresh } from "./data/controller";

import { userStore } from "./stores";
import Pricing from "./components/landing/Pricing";
import Example from "./components/landing/Example";
import ContactUs from "./components/landing/ContactUs";

function App() {
  const user = userStore((state) => state.user);
  const storeUser = userStore((state) => state.storeUser);
  const removeUser = userStore((state) => state.removeUser);
  const isLoadingUser = userStore((state) => state.isLoadingUser);
  const setIsLoadingUser = userStore((state) => state.setIsLoadingUser);

  useEffect(() => {
    console.log("User", user);

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

  // useEffect(() => {
  //   window.addEventListener("offline", () => {
  //     toast.error("it seems you're offline");
  //   });
  //   window.addEventListener("online", () => {
  //     toast.success("you're back online!");
  //   });
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/example" element={<Example />} />
        <Route path="/lawyer-signup" element={<LawyerSignup />} />
        <Route path="/client-signup" element={<ClientSignup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/payments/flutterwave" element={<Flutterwave />} />
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
        {!user && !isLoadingUser && <Route path="*" element={<Signin />} />}
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </Router>
  );
}

export default App;
