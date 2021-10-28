import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge,
  CFormGroup,
  CInput,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
import AddUser from '../adduser/AddUser'
import StatusModel from '../statusmodel/StatusModel'
import UpdateUser from '../updateuser/UpdateUser'
import DeleteUser from '../deleteuser/DeleteUser'
import { useHistory } from 'react-router'
import ReactPaginate from "react-paginate";
import { getDateTime } from '../../common/constant'
// import Loader from "../../containers/Loader/Loader"

const fields = ['name', 'department', 'email', 'createdAt', 'role', 'status', 'actions']

const Tables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const token = getToken();
  const history = useHistory();

  // ! change model add use state
  const changeState = () => {
    setToggle(!toggle);
  }

  // ! status model
  const [statusModelToggle, setStatusModelToggle] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [status, setStatus] = useState(null);
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

  // ! user details
  const userDetails = (userDetailsId) => {
    history.push(`/users/user-details/${userDetailsId}`)
  }

  // ! pagination code
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let limit = 10;

  const fetchUserListWithLimit = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/auth/user-list?search=${search}&page=1&limit=${limit}`, {
      headers: {
        'authorization': token
      }
    });
    const total = response.data.totalRecords;
    const data = response.data.data;
    setPageCount(Math.ceil(total / limit));
    setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserListWithLimit();
  }, []);

  const fetchUserListWithLimitCurrentPage = async (currentPage) => {
    setIsLoading(true);
    const response = await axios.get(`/api/auth/user-list?search=${search}&status=${searchStatus}&role=${searchRole}&department=${searchDepartment}&page=${currentPage}&limit=${limit}`, {
      headers: {
        'authorization': token
      }
    });
    setIsLoading(false);
    const data = response.data.data;
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const userList = await fetchUserListWithLimitCurrentPage(currentPage);
    setItems(userList);
  };

  // ! searching functionality
  const [filterToggle, setFilterToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  useEffect(() => {
    const getSearchApi = async () => {
      setIsLoading(true);
      const response = await axios.get(`/api/auth/user-list?search=${search}&status=${searchStatus}&role=${searchRole}&department=${searchDepartment}`, {
        headers: {
          'authorization': token
        }
      });
      const data = response.data.data;
      setItems(data);
      setIsLoading(false);
    };
    if (search !== "" || searchStatus !== "" || searchRole !== "" || searchDepartment !== "") {
      getSearchApi();
    } else {
      fetchUserListWithLimit();
    }
  }, [search, searchStatus, searchRole, searchDepartment]);

  // ! user select option by searching
  const departmentChange = (e) => {
    setSearchDepartment(e.target.value);
  }
  const roleChange = (e) => {
    setSearchRole(e.target.value);
  }
  const statusChange = (e) => {
    setSearchStatus(e.target.value);
  }

  // ! For clearing all filters
  const clearFilter = () => {
    setFilterToggle(!filterToggle);
    setSearchDepartment("");
    setSearchRole("");
    setSearchStatus("");
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          Users List
          <div className="card-header-actions">
            <button className="btn btn-primary" onClick={changeState} type="submit">Add user</button>
          </div>
        </CCardHeader>
        <CCardHeader>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CFormGroup>
                <CInput id="search" value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search" autoComplete="off" />
              </CFormGroup>
            </CCol>
            <CCol md="4">
              {
                filterToggle === false ? <button className="btn btn-primary btn-block" onClick={() => setFilterToggle(!filterToggle)}>Add Filter</button> :
                  <button className="btn btn-primary btn-block" onClick={clearFilter}>Clear Filter</button>
              }
            </CCol>
          </CRow>
          {
            filterToggle ?
              <CRow className="justify-content-center">
                <CCol md="4">
                  <CSelect value={searchDepartment} name="department" id="department" onChange={departmentChange}>
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Business Development">Business Development</option>
                  </CSelect>
                </CCol>

                <CCol md="4">
                  <CSelect value={searchRole} name="role" id="role" onChange={roleChange}>
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </CSelect>
                </CCol>

                <CCol md="4">
                  <CSelect value={searchStatus} name="status" id="status" onChange={statusChange}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </CSelect>
                </CCol>
              </CRow> : null
          }
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={items}
            fields={fields}
            loading={isLoading}
            // itemsPerPage={5}
            // pagination
            scopedSlots={{
              'name':
                (item) => (
                  <td className="text-capitalize">
                    {item.fullName}
                  </td>
                ),
              'createdAt':
                (item) => (
                  <td>
                    {getDateTime(item.createdAt)}
                  </td>
                ),
              'actions':
                (item) => (
                  <td>
                    <div className="d-flex">
                      <CBadge color="primary" className="pointer">
                        <CIcon name="cil-pen" onClick={() => updateUser(item._id)} />
                      </CBadge>
                      <CBadge color="success" className="pointer mx-1">
                        <CIcon name="cil-braille" onClick={() => userDetails(item._id)} />
                      </CBadge>
                      {
                        localStorage.getItem('role') === "Admin" ?
                          <CBadge color="danger" className="pointer">
                            <CIcon name="cil-trash" onClick={() => deleteUser(item._id)} />
                          </CBadge>
                          : null
                      }
                    </div>
                  </td>
                ),
              'status':
                (item) => (
                  <td>
                    {
                      localStorage.getItem('role') === "Admin"
                        ?
                        item.status === "Active" ?
                          <CBadge color="success" className="pointer" onClick={() => changeModelState(item._id, item.status)}>
                            {item.status}
                          </CBadge> :
                          <CBadge color="primary" className="pointer" onClick={() => changeModelState(item._id, item.status)}>
                            {item.status}
                          </CBadge>
                        :
                        item.status === "Active" ?
                          <CBadge color="success">
                            {item.status}
                          </CBadge> :
                          <CBadge color="primary">
                            {item.status}
                          </CBadge>
                    }
                  </td>
                ),
            }
            }
          />
          {items.length >= 10 ?
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-start"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
            : null}
        </CCardBody>
      </CCard>

      <AddUser toggleModel={changeState} showHide={toggle} />
      <StatusModel toggleModel={changeModelState} showHide={statusModelToggle} statusId={statusId} status={status} />
      <UpdateUser toggleModel={updateUser} showHide={updateUserModelToggle} updateId={updateId} />
      <DeleteUser toggleModel={deleteUser} showHide={deleteUserModelToggle} deleteId={deleteId} />
    </>
  )
}

export default Tables


