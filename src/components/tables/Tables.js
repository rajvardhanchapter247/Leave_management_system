import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import usersData from '../users/UsersData'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
import { setUserSession } from '../storage/LocalStorage';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../pages/login/TextField'
import Select from 'react-select';
import AddUser from '../adduser/AddUser'


// import usersData from '../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Deactive': return 'danger'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id', 'name', 'department', 'email', 'role', 'status', 'actions']

const Tables = () => {
  const [toggle, setToggle] = useState(false)
  const [usersList, setUsersList] = useState([]);
  const token = getToken();

  useEffect(() => {
    fetchUsers();
  }, []);

  //! fetch users list from api
  const fetchUsers = async () => {
    const response = await axios.get('/api/auth/user-list', {
      headers: {
        'authorization': token
      }
    });
    // console.log(response.data.data);
    setUsersList(response.data.data)
  }

  const changeState = () => {
    setToggle(!toggle);
  }

  return (
    <>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardBody>
              <CRow className="d-flex justify-content-between align-items-center">
                <CCol md="2">Users</CCol>
                <CCol md="2"><button className="btn btn-primary" onClick={changeState} type="submit">Add user</button></CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              Users List
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersList}
                fields={fields}
                bordered
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  'id':
                    (item, index) => (
                      <td>
                        {index}
                      </td>
                    ),
                  'name':
                    (item) => (
                      <td className="text-capitalize">
                        {item.fullName}
                      </td>
                    ),
                  'actions':
                    (item) => (
                      <td>
                        <button className="btn btn-primary btn-sm">
                          <CIcon name="cil-pen" />
                        </button>
                        <button className="btn btn-danger btn-sm mx-1">
                          <CIcon name="cil-trash" />
                        </button>
                      </td>
                    ),
                  'status':
                    (item) => (
                      <td>
                        {
                          item.status === "Active" ?
                            <button className="btn btn-success btn-sm">
                              {item.status}
                            </button> :
                            <button className="btn btn-primary btn-sm">
                              {item.status}
                            </button>
                        }
                      </td>
                    ),
                }
                }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <AddUser toggleModel={toggle} />
    </>
  )
}

export default Tables


