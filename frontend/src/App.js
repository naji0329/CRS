import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Alert from './components/layout/Alert';
// import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

import Dashboard from './components/Dashboard';

import AdminDashboard from './components/Admin/Dashboard';
import CreateTechnicianlist from './components/Admin/Technicianlist/Create';
import CreateMainComponentList from './components/Admin/MainComponentList/Create';
import CreateCustomerProfile from './components/Admin/CustomerProfile/Create';
import CreateSecondaryList from './components/Admin/SecondaryList/Create';
import CreateEquipmentProfile from './components/Admin/EquipmentProfile/Create';
import CreateMaintenancePlanCheckList from './components/Admin/MaintenancePlanCheckList/Create';

// import TechnicianDashboard from './components/Technician/Dashboard';
import Pmp from './components/Technician/Pmp';
import Oicl from './components/Technician/Oicl';
import Technicianlist from './components/Admin/Technicianlist/List';

import './App.scss';

function App() {
  // useEffect(() => {
  //   // check for token in LS when app first runs
  //   if (localStorage.token) {
  //     // if there is a token set axios headers for all requests
  //     setAuthToken(localStorage.token);
  //   }
  //   // try to fetch a user, if no token or invalid token we
  //   // will get a 401 response from our API
  //   store.dispatch(loadUser());

  //   // log user out from all tabs if they log out in one tab
  //   window.addEventListener('storage', () => {
  //     if (!localStorage.token) store.dispatch({ type: LOGOUT });
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/technicianlist/create" element={<CreateTechnicianlist />} />
          <Route path="/admin/technicianlist/get" element={<Technicianlist />} />
          <Route path="/admin/maincomponentlist/create" element={<CreateMainComponentList />} />
          <Route path="/admin/customerprofile/create" element={<CreateCustomerProfile />} />
          <Route path="/admin/secondarylist/create" element={<CreateSecondaryList />} />
          <Route path="/admin/equipment/create" element={<CreateEquipmentProfile />} />
          <Route
            path="/admin/maintenanceplanchecklist/create"
            element={<CreateMaintenancePlanCheckList />}
          />

          <Route path="/technician/dashboard" element={<Pmp />} />
          <Route path="/technician/pmp" element={<Pmp />} />

          <Route path="/technician/plan" element={<Oicl />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
