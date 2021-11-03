import React from 'react';

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
// const UserDashboard = React.lazy(() => import('./UserSide/Components/UserDashboard/UserDashboard'));
// const Holidays = React.lazy(() => import('./components/holidays/Holidays'));
const Users = React.lazy(() => import('./components/tables/Tables'));
const Settings = React.lazy(() => import('./components/settings/Settings'))
const UserDetails = React.lazy(() => import("./components/userdetails/UserDetails"))
const UserProfile = React.lazy(() => import('./UserSide/Components/Userprofile/UserProfile'))
const ChangePassword = React.lazy(() => import('./UserSide/Components/changepassword/ChangePassword'))
const LeaveRequests = React.lazy(() => import('./UserSide/Components/leaverequests/LeaveRequests'))

const routes = [

  { path: '/leave-requests', exact: true, name: 'LeaveRequest', component: LeaveRequests },
  // { path: '/UserDashboard', exact: true, name: 'UserDashboard', component: UserDashboard },
  // { path: '/holidays', exact: true, name: 'Holidays', component: Holidays },
  { path: '/user-profile', exact: true, name: 'UserProfile', component: UserProfile },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/settings', exact: true, name: 'Settings', component: Settings },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/user-details/:UserId', name: 'UserDetails', component: UserDetails },
  { path: '/change-password', exact: true, name: 'ChangePassword', component: ChangePassword },
];

export default routes;
