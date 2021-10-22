import React, { useState, useEffect } from 'react'
import {
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
import AddUser from '../adduser/AddUser'
import StatusModel from '../statusmodel/StatusModel'
import UpdateUser from '../updateuser/UpdateUser'

// const getBadge = status => {
//   switch (status) {
//     case 'Active': return 'success'
//     case 'Deactive': return 'danger'
//     case 'Pending': return 'warning'
//     case 'Banned': return 'danger'
//     default: return 'primary'
//   }
// }
const fields = ['name', 'department', 'email', 'role', 'status', 'actions']

const Tables = () => {
  const [toggle, setToggle] = useState(false)
  const [usersList, setUsersList] = useState([]);
  const token = getToken();

  useEffect(() => {
    fetchUsers();
  }, []);

  //! fetch users list from api
  const fetchUsers = async () => {
    const response = await axios.get(`/api/auth/user-list?limit=30`, {
      headers: {
        'authorization': token
      }
    });
    // console.log(response.data.data);
    setUsersList(response.data.data)
  }

  // ! change model add use state
  const changeState = () => {
    setToggle(!toggle);
  }

  // ! status model
  const [statusModelToggle, setStatusModelToggle] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [status, setStatus] = useState(null);

  // ! change model status state
  const changeModelState = (statusId, buttonStatus) => {
    setStatusId(statusId);
    setStatusModelToggle(!statusModelToggle);
    setStatus(buttonStatus);
  }


  // ! update user model
  const [updateUserModelToggle, setUpdateUserModelToggle] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const updateUser = (updateId) => {
    // console.log(updateId);
    setUpdateId(updateId);
    setUpdateUserModelToggle(!updateUserModelToggle);
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              Users List <button className="btn btn-primary ml-5" onClick={changeState} type="submit">Add user</button>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersList}
                fields={fields}
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  'name':
                    (item) => (
                      <td className="text-capitalize">
                        {item.fullName}
                      </td>
                    ),
                  'actions':
                    (item) => (
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => updateUser(item._id)}>
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
                            <button className="btn btn-success btn-sm" onClick={() => changeModelState(item._id, item.status)}>
                              {item.status}
                            </button> :
                            <button className="btn btn-primary btn-sm" onClick={() => changeModelState(item._id, item.status)}>
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

      <AddUser toggleModel={changeState} showHide={toggle} />
      <StatusModel toggleModel={changeModelState} showHide={statusModelToggle} statusId={statusId} status={status} />
      <UpdateUser toggleModel={updateUser} showHide={updateUserModelToggle} updateId={updateId}/>
    </>
  )
}

export default Tables


