import React, { useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CInputRadio
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setUserSession } from '../../components/storage/LocalStorage';


import usersData from '../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Deactive': return 'danger'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id', 'name', 'email', 'role', 'status', 'actions']

const Tables = () => {

  const [primary, setprimary] = useState(false)


  const [error, setError] = useState(null);
  const history = useHistory();


  const sendGetRequest = async (data) => {
    setError(null);
    try {
      const response = await axios.post("/api/auth/login", {
        email: data.email,
        password: data.password
      });
      console.log(response);
      setUserSession(response.data.token, response.data.user);
      history.push('/dashboard');
    } catch (error) {
      // Handle Error Here
      setError("Something went wrong Please try again !");
      console.log("error ==>" + error);
    }
  };

  const SubmitEvent = (values) => {
    console.log("submit data", values);
    sendGetRequest(values);
    document.getElementById("form").reset();
  }



  return (
    <>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardBody>
              <CRow className="d-flex justify-content-between align-items-center">
                <CCol md="2">Users</CCol>
                <CCol md="2"><button className="btn btn-primary" onClick={() => setprimary(!primary)} type="submit">Add user</button></CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              Users List
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                bordered
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  'actions':
                    (item) => (
                      <td>
                        <button className="btn btn-primary btn-sm">
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
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    )
                }

                }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      {/* Modal start here */}

      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CModal
                show={primary}
                onClose={() => setprimary(!primary)}
                color="primary"
                className="modal"
                tabIndex="-1"
              >
                <CForm>
                  <CModalHeader closeButton>
                    <CModalTitle>Create user</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <CRow>
                      <CCol md="12">
                        <CRow>
                          <CCol md="4">
                            <CFormGroup>
                              <CLabel htmlFor="ccnumber">First Name</CLabel>
                              <CInput id="firstName" placeholder="" required />
                            </CFormGroup>
                          </CCol>
                          <CCol md="4">
                            <CFormGroup>
                              <CLabel htmlFor="ccnumber">Middle Name</CLabel>
                              <CInput id="middleName" placeholder="" required />
                            </CFormGroup>
                          </CCol>
                          <CCol md="4">
                            <CFormGroup>
                              <CLabel htmlFor="ccnumber">Last Name</CLabel>
                              <CInput id="lastName" placeholder="" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol md="12">
                        <CFormGroup>
                          <CLabel htmlFor="ccnumber">Email</CLabel>
                          <CInput id="email" placeholder="" required />
                        </CFormGroup>
                      </CCol>
                      <CCol md="12">
                        <CFormGroup>
                          <CLabel htmlFor="ccnumber">Department</CLabel>
                          <CSelect custom name="department" id="department">
                            <option value="1">Development</option>
                            <option value="2">Qa</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol md="12">
                        <CRow>
                          <CCol md="6">
                            <CFormGroup>
                              <CLabel htmlFor="ccnumber">Role</CLabel>
                              <CSelect custom name="department" id="department">
                                <option value="1">Admin</option>
                                <option value="2">Employee</option>
                              </CSelect>
                            </CFormGroup>
                          </CCol>
                          <CCol md="6">
                            <CFormGroup>
                              <CLabel htmlFor="ccnumber">Reporting Person</CLabel>
                              <CInput id="reportingPerson" placeholder="" required />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol md="12">
                        <CFormGroup variant="custom-radio" inline>
                          <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Male</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio" inline>
                          <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Female</CLabel>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CModalBody>
                  <CModalFooter>
                    <CFormGroup>
                      <CButton type="submit" color="primary">Submit</CButton>{' '}
                    </CFormGroup>
                  </CModalFooter>
                </CForm>
              </CModal>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Modal end here */}
    </>
  )
}

export default Tables
