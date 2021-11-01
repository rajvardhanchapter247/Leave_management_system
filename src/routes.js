import React from 'react';

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
// const UserDashboard = React.lazy(() => import('./UserSide/Components/UserDashboard/UserDashboard'));
// const Holidays = React.lazy(() => import('./components/holidays/Holidays'));
const Users = React.lazy(() => import('./components/tables/Tables'));
const Settings = React.lazy(() => import('./components/settings/Settings'))
const UserDetails = React.lazy(() => import("./components/userdetails/UserDetails"))
const User_profile = React.lazy(() => import('./UserSide/Components/User_profile/User_profile'))
const Change_password = React.lazy(() => import('./UserSide/Components/change_password/Change_password'))
const LeaveRequests = React.lazy(() => import('./UserSide/Components/leaverequests/LeaveRequests'))

const routes = [

  { path: '/leave-requests', exact: true, name: 'LeaveRequest', component: LeaveRequests },
  // { path: '/UserDashboard', exact: true, name: 'UserDashboard', component: UserDashboard },
  // { path: '/holidays', exact: true, name: 'Holidays', component: Holidays },
  { path: '/User_profile', exact: true, name: 'User_profile', component: User_profile },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/settings', exact: true, name: 'Settings', component: Settings },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/user-details/:UserId', name: 'UserDetails', component: UserDetails },
  { path: '/Change_password', exact: true, name: 'Change_password', component: Change_password },
];

export default routes;
