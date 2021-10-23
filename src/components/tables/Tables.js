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
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
import AddUser from '../adduser/AddUser'
import StatusModel from '../statusmodel/StatusModel'
import UpdateUser from '../updateuser/UpdateUser'
import DeleteUser from '../deleteuser/DeleteUser'
import UserDetails from '../userdetails/UserDetails'

const fields = ['name', 'department', 'email', 'role', 'status', 'actions']

const Tables = () => {
  const [toggle, setToggle] = useState(false)
  const [usersList, setUsersList] = useState([]);
  const token = getToken();

  useEffect(() => {
    fetchUsers();
  });

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
    setUpdateUserModelToggle(!updateUserModelToggle);
    setUpdateId(updateId);
  }

  // ! delete user model
  const [deleteUserModelToggle, setDeleteUserModelToggle] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const deleteUser = (deleteId) => {
    setDeleteUserModelToggle(!deleteUserModelToggle);
    setDeleteId(deleteId);
  }

  // ! user details model
  const [userDetailsModelToggle, setUserDetailsModelToggle] = useState(false);
  const [userDetailsId, setUserDetailsId] = useState(null);
  const userDetails = (userDetailsId) => {
    setUserDetailsModelToggle(!userDetailsModelToggle);
    setUserDetailsId(userDetailsId);
  }
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              Users List
              <div className="card-header-actions">
                <button className="btn btn-primary btn-sm ml-5" onClick={changeState} type="submit">Add user</button>
              </div>
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
                        <CBadge color="primary" className="pointer">
                          <CIcon name="cil-pen" onClick={() => updateUser(item._id)} />
                        </CBadge>
                        <CBadge color="success" className="pointer mx-1">
                          <CIcon name="cil-braille" onClick={() => userDetails(item._id)} />
                        </CBadge>
                        <CBadge color="danger" className="pointer">
                          <CIcon name="cil-trash" onClick={() => deleteUser(item._id)} />
                        </CBadge>
                      </td>
                    ),
                  'status':
                    (item) => (
                      <td>
                        {
                          item.status === "Active" ?
                            <CBadge color="success" className="pointer" onClick={() => changeModelState(item._id, item.status)}>
                              {item.status}
                            </CBadge> :
                            <CBadge color="primary" className="pointer" onClick={() => changeModelState(item._id, item.status)}>
                              {item.status}
                            </CBadge>
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
      <UpdateUser toggleModel={updateUser} showHide={updateUserModelToggle} updateId={updateId} />
      <DeleteUser toggleModel={deleteUser} showHide={deleteUserModelToggle} deleteId={deleteId} />
      <UserDetails toggleModel={userDetails} showHide={userDetailsModelToggle} userDetailsId={userDetailsId}/>
    </>
  )
}

export default Tables


