import {
  CCard,
  CRow,
  CCardBody,
  CCol,
  CContainer,
  CCardHeader,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CDataTable,
  CBadge
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getDateTime } from '../../../common/constant'
import { getToken } from '../../../components/storage/LocalStorage'
import Full_calander from '../full_calander/Full_calander.jsx'

const fields = ['fullName', 'datesToRequest', 'reason', 'status']

const User_dashboard = () => {
  const [usersList, setUsersList] = useState([])
  const token = getToken()

  useEffect(() => {
    fetchUsers()
  })

  const fetchUsers = async () => {
    const response = await axios.get(`/api/leave-request/me`, {
      headers: {
        authorization: token
      }
    })

    setUsersList(response.data.data)
  }
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
                          <Full_calander />
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
        <CCol xs='12'>
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
                      scopedSlots={{
                        name: item => (
                          <td className='text-capitalize'>{item.fullName}</td>
                        ),
                        datesToRequest: item => (
                          <td className='text-capitalize'>
                            {item.datesToRequest.map(date => getDateTime(date))}
                          </td>
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

export default User_dashboard
