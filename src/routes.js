import React from 'react';

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const User_dashboard = React.lazy(() => import('./UserSide/Components/user_dashboard/User_dashboard'));
const Employees = React.lazy(() => import('./components/employees/Employees'));
const Holidays = React.lazy(() => import('./components/holidays/Holidays'));
const Users = React.lazy(() => import('./components/tables/Tables'));

const routes = [
  { path: '/user_dashboard', exact: true , name: 'User_dashboard', component: User_dashboard },
  { path: '/dashboard', exact: true , name: 'Dashboard', component: Dashboard },
  { path: '/employees/all', exact: true , name: 'Employees', component: Employees },
  { path: '/employees/holidays', exact: true , name: 'Holidays', component: Holidays },
  { path: '/users', exact: true , name: 'Users', component: Users },
];

export default routes;
