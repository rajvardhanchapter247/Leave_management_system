import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import usersData from '../users/UsersData'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'

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

  const [usersList, setUsersList] = useState([]);
  const token = getToken();

  //! fetch users list from api
  const fetchUsers = async () => {
    const response = await axios.get('/api/auth/user-list', {
      headers: {
        'authorization': token
      }
    });
    console.log(response.data.data);
    setUsersList(response.data.data)
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Welcome Admin!</h1>
      <h3 className="my-3">Users</h3>
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
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                }

                }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables