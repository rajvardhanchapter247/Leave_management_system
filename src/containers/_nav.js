import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  // ! Dashboard sidebar
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  // ! Holidays sidebar
  {
    _tag: 'CSidebarNavItem',
    name: 'Holidays',
    to: '/holidays',
    icon: <CIcon name="cil-object-group" customClasses="c-sidebar-nav-icon" />,
  },

  // ! Users sidebar
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'User_side',
    route: '',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Users_dashboard',
        to: '/User_dashboard',
        icon: <CIcon name="cil-contact" customClasses="c-sidebar-nav-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'User profile',
        to: '/User_profile',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave_list',
        to: '/Leave_list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Forgot_password',
        to: '/Forgot_password',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Forms',
        to: '/base/forms',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Jumbotron',
        to: '/base/jumbotrons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navs',
        to: '/base/navs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navbars',
        to: '/base/navbars',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/base/progress-bar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Switches',
        to: '/base/switches',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  


  // // ! Department sidebar
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Departments',
  //   to: '/departments',
  //   icon: <CIcon name="cil-object-group" customClasses="c-sidebar-nav-icon" />,
  // },

  // // ! Designation sidebar
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Designations',
  //   to: '/designations',
  //   icon: <CIcon name="cil-send" customClasses="c-sidebar-nav-icon" />,
  // },

  // // ! Reports sidebar
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Reports',
  //   to: '/reports',
  //   icon: <CIcon name="cil-spreadsheet" customClasses="c-sidebar-nav-icon" />,
  // },

]

export default _nav
