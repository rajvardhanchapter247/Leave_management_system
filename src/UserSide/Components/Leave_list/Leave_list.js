import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge
} from '@coreui/react'
import axios from 'axios'
import {getDateTime} from '../../../common/constant';
// import dateformat from 'dateformat'
import { getToken } from '../../storage/Local_Storage'

const fields = ['fullName', 'datesToRequest', 'reason', 'status']

const Leave_list = () => {
  const [toggle, setToggle] = useState(false)
  const [usersList, setUsersList] = useState([])
  const token = getToken()

  useEffect(() => {
    fetchUsers()
  })

  //! fetch users list from api
  const fetchUsers = async () => {
    const response = await axios.get(`/api/leave-request/list`, {
      headers: {
        authorization: token
      }
    })

    setUsersList(response.data.data)
  }

  // ! change model add use state
  const changeState = () => {
    setToggle(!toggle)
  }

  // ! status model

  // const getDateTime = data => {
  //   return moment(data).format('YYYY-MM-DD , ')
  // }

  const [status, setStatus] = useState(null)
  // ! change model status state
  const changeModelState = (statusId, buttonStatus) => {
    setStatus(buttonStatus)
  }

  // ! update user model
  const [updateUserModelToggle, setUpdateUserModelToggle] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const updateUser = updateId => {
    setUpdateUserModelToggle(!updateUserModelToggle)
    setUpdateId(updateId)
  }

  // ! delete user model
  const [deleteUserModelToggle, setDeleteUserModelToggle] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const deleteUser = deleteId => {
    setDeleteUserModelToggle(!deleteUserModelToggle)
    setDeleteId(deleteId)
  }

  return (
    <>
      <CRow>
        <CCol md='12'>
          <CCard>
            <CCardHeader>Users List</CCardHeader>
            <CCardBody>
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Leave_list
