import React from 'react'
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


import usersData from '../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Deactive': return 'danger'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id', 'name', 'email', 'role', 'status', 'actions']

const Tables = () => {
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
                items={usersData}
                fields={fields}
                bordered
                itemsPerPage={5}
                pagination
                scopedSlots={{
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
                    )
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
