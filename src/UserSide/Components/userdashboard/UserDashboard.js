import {
  CCard,
  CRow,
  CCardBody,
  CCol,
  CCardHeader,
  CForm,
  CFormGroup,
  CLabel,
  CDataTable,
  CBadge
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getDateTime } from '../../../common/constant'
import { getToken } from '../../../components/storage/LocalStorage'
import FullCalander from '../full_calander/FullCalander'

const fields = ['datesToRequest', 'reason', 'status']

const UserDashboard = () => {
  const [usersList, setUsersList] = useState([])
  useEffect(() => {
    var token = getToken()
    const fetchUsers = async () => {
      const response = await axios.get('/api/leave-request/me', {
        headers: {
          authorization: token
        }
      })
      setUsersList(response.data.data)
      console.log('response: ', response.data)
    }
    fetchUsers()
  }, [])
  return (
    <>
      <CRow>
        <CCol xs='12'>
          <CCard>
            <CCardHeader>Add leave</CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol md='12'>
                    <CFormGroup>
                      <CLabel>Select date</CLabel>
                      <CRow>
                        <CCol md='12'>
                          <FullCalander />
                        </CCol>
                      </CRow>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol md='12'>
          <CCard>
            <CCardHeader>My Leaves</CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol md='12'>
                    <CDataTable
                      items={usersList}
                      fields={fields}
                      itemsPerPage={5}
                      pagination
                      hover
                      border
                      outlined
                      scopedSlots={{
                        datesToRequest: item => (
                          <td className='text-capitalize'>
                            {item.datesToRequest.map(date => getDateTime(date))}
                          </td>
                        ),
                        reason: item => (
                          <td className='text-capitalize'>{item.reason}</td>
                        ),
                        status: item => (
                          <td>
                            {item.status === 'Active' ? (
                              <CBadge color='success' className='pointer'>
                                {item.status}
                              </CBadge>
                            ) : (
                              <CBadge color='primary' className='pointer'>
                                {item.status}
                              </CBadge>
                            )}
                          </td>
                        )
                      }}
                    />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserDashboard
