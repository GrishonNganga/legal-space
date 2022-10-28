import { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import { userStore } from './stores';

import Landing from './pages/landing';
import ClientSignup from './pages/client/signup'
import Signin from './pages/client/signin'
import FourOhFour from './pages/404';
import Dashboard from './pages/dashboard'

import { refresh } from './data/controller/auth'

function App() {
  const user = userStore(state => state.user)
  const storeUser = userStore(state => state.storeUser)
  const removeUser = userStore(state => state.removeUser)

  useEffect(() => {
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
        <Route path='/client-signup' element={<ClientSignup />} />
        <Route path='/signin' element={<Signin />} />
        {

          <Route path='/dashboard' element={<Dashboard />} />

        }
        <Route
          path="*"
          element={<FourOhFour />}
        />
      </Routes>
    </Router>
  );
}

export default App;
