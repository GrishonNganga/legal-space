import { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import { userStore } from './stores';

import Landing from './pages/landing';
import LawyerSignup from './pages/lawyer/signup'
import ClientSignup from './pages/client/signup'
import Signin from './pages/lawyer/signin'
import FourOhFour from './pages/404';
import ClientDashboard from './pages/client/dashboard'
import LawyerDashboard from './pages/lawyer/dashboard'
import Onboarding from './pages/lawyer/onboarding'

import { refresh } from './data/controller'

function App() {
  const user = userStore(state => state.user)
  const storeUser = userStore(state => state.storeUser)
  const removeUser = userStore(state => state.removeUser)
  const isLoadingUser = userStore(state => state.isLoadingUser)

  useEffect(() => {
    console.log("USER", user)
    if (!user) {
      refresh().then(response => {
        if (response.status === "success") {
          storeUser(response.data.user)
        } else {
          removeUser()
        }
      })
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/lawyer-signup' element={<LawyerSignup />} />
        <Route path='/client-signup' element={<ClientSignup />} />
        <Route path='/signin' element={<Signin />} />
        {
          user?.role === "client" &&
          <>
            <Route path='/dashboard/*' element={<ClientDashboard />} />
          </>
        }
        {
          user?.role === "lawyer" &&
          <>
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path='/dashboard/*' element={<LawyerDashboard />} />
          </>
        }
        {
          !isLoadingUser &&
          <Route
            path="*"
            element={<FourOhFour />}
          />
        }
      </Routes>
    </Router>
  );
}

export default App;
