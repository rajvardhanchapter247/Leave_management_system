import React, { lazy } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import UserDashboard from '../../UserSide/Components/userdashboard/UserDashboard'
const Widgets = lazy(() => import('../widgets/Widgets'))

const Dashboard = () => {
  return (
    <>
      {
        localStorage.getItem("role") === "Admin" ? <>
          <Widgets />
          <CCard>
            <CCardHeader>
              Leaves Status Chart
            </CCardHeader>
            <CCardBody>
              <CChartPie
                datasets={[
                  {
                    backgroundColor: ['#39f', '#7254f3', '#2eb85c', '#f9b115', '#e55353'],
                    data: [70, 100, 45, 25, 30]
                  }
                ]}
                labels={['Employees', 'Leaves', 'Approved', 'Pending', 'Canceled']}
                options={{ tooltips: { enabled: true } }}
              />
            </CCardBody>
          </CCard>
        </> : <UserDashboard />
      }


    </>
  )
}

export default Dashboard
