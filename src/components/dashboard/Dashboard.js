import React, { lazy, useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader,CCol,CRow,CWidgetIcon } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CChartPie } from '@coreui/react-chartjs'
import UserDashboard from '../../UserSide/Components/userdashboard/UserDashboard'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'

const Dashboard = () => {
  const [data, setData] = useState()
  console.log('data: ', data);

  const token = getToken()

  const dashboardData = async () => {
    try {
      const response = await axios.get(`/api/dashboard/user-leave-count`, {
        headers: {
          authorization: token
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log('Somethong went wrong!', error)
    }
  }

  useEffect(() => {
    dashboardData()
  }, [])

  return (
    <>
      {localStorage.getItem('role') === 'Admin' ? (
        <>
          <CRow>
            <CCol xs='12' sm='6' lg='4'>
              <CWidgetIcon text='Employees' header={data.totalUsers} color='primary'>
                <CIcon width={24} name='cil-user' />
              </CWidgetIcon>
            </CCol>
            <CCol xs='12' sm='6' lg='4'>
              <CWidgetIcon text='Leaves' header='100' color='info'>
                <CIcon width={24} name='cil-moon' />
              </CWidgetIcon>
            </CCol>
            <CCol xs='12' sm='6' lg='4'>
              <CWidgetIcon text='Approved' header={data.approvedLeaves} color='success'>
                <CIcon width={24} name='cil-check-alt' />
              </CWidgetIcon>
            </CCol>
            <CCol xs='12' sm='6' lg='6'>
              <CWidgetIcon text='Pending' header={data.pendingLeaves} color='warning'>
                <CIcon width={24} name='cil-grain' />
              </CWidgetIcon>
            </CCol>
            <CCol xs='12' sm='12' lg='6'>
              <CWidgetIcon text='Canceled' header={data.totalEmployees  } color='danger'>
                <CIcon width={24} name='cil-x' />
              </CWidgetIcon>
            </CCol>
          </CRow>
          <CCard>
            <CCardHeader>Leaves Status Chart</CCardHeader>
            <CCardBody>
              <CChartPie
                datasets={[
                  {
                    backgroundColor: [
                      '#39f',
                      '#7254f3',
                      '#2eb85c',
                      '#f9b115',
                      '#e55353'
                    ],
                    data: [70, 100, 45, 25, 30]
                  }
                ]}
                labels={[
                  'Employees',
                  'Leaves',
                  'Approved',
                  'Pending',
                  'Canceled'
                ]}
                options={{ tooltips: { enabled: true } }}
              />
            </CCardBody>
          </CCard>
        </>
      ) : (
        <UserDashboard />
      )}
    </>
  )
}

export default Dashboard
