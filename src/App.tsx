import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Identity from './pages/Identity';
import IdentityDetail from './pages/IdentityDetail';
import Group from './pages/Group';
import GroupDetail from './pages/GroupDetail';
import Setup from './pages/Setup';
import SetupDetail from './pages/SetupDetail';
import Applications from './pages/setup/Applications';
import Tasks from './pages/setup/Tasks';
import Policies from './pages/setup/Policies';
import IdentitySync from './pages/setup/IdentitySync';
import AddApplication from './pages/setup/AddApplication';
import AddGroup from './pages/group/AddGroup';
import AuditTrails from './pages/intelligence/AuditTrails';
import InternTrainee from './pages/setup/InternTrainee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="identity" element={<Identity />} />
          <Route path="identity/:id" element={<IdentityDetail />} />
          <Route path="group" element={<Group />} />
          <Route path="group/:id" element={<GroupDetail />} />
          <Route path="group/add" element={<AddGroup />} />
          <Route path="intelligence/audit-trails" element={<AuditTrails />} />
          <Route path="setup" element={<Setup />} />
          <Route path="setup/:id" element={<SetupDetail />} />
          <Route path="setup/applications" element={<Applications />} />
          <Route path="setup/tasks" element={<Tasks />} />
          <Route path="setup/policies" element={<Policies />} />
          <Route path="setup/identity-sync" element={<IdentitySync />} />
          <Route path="setup/applications/add" element={<AddApplication />} />
          <Route path="setup/intern-trainee" element={<InternTrainee />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;