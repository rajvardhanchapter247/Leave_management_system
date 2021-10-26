import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { getToken } from '../components/storage/LocalStorage'


const TheLayout = () => {
  const history = useHistory();

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      history.push("/login")
    }
  }, [])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
