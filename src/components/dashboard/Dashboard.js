import React, { lazy } from 'react'
import { useHistory } from 'react-router'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import { removeUserSession } from '../storage/LocalStorage'


const Widgets = lazy(() => import('../widgets/Widgets'))

const Dashboard = () => {

  const history = useHistory();

  const Logout = () => {
    removeUserSession();
    history.push("/login");
  }
  return (  
    <>
      {/* Dashboard Admin Header Part */}
      <h1>Welcome Admin!</h1>
      <h3 className="my-3">Dashboard</h3>
      <button className="btn btn-primary" onClick={Logout}>Logout</button>
      {/* Dashboard Admin Leaves section */}
      <Widgets />
      {/* Dashboard Admin Leaves Chart Status */}
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
    </>
  )
}

export default Dashboard
