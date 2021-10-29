import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CInputRadio
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '..//../storage/Local_Storage'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from '../text_field/TextField'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

const User_profile = props => {
  const token = getToken()
  const history = useHistory()
  const [reportingPersons, setReportingPersons] = useState([])

  const [id, setId] = useState()

  

  const updateUserApi = async values => {
    try {
      const response = await axios.put(
        `/api/auth/update-user/${id}`,
        {
          firstName: values.fname,
          middleName: values.mname,
          lastName: values.lname,
          email: values.email
          // department: values.department,
          // role: values.role,
          // reportingPerson: values.reportingPerson,
          // gender: values.gender
        },

        {
          headers: {
            authorization: token
          }
        }
      )
      console.log('Update user Successfully', response)
      alert('Update user Successfully')
    } catch (error) {
      console.log('Something went wrong!', error)
    }
  }

  const validate = Yup.object({
    email: Yup.string()
      .trim()
      .email('Email is invalid')
      .required('Email is required'),
    fname: Yup.string()
      .trim()
      .max(15, 'Maximum 15 character allow.')
      .required('First Name is required'),
    lname: Yup.string()
      .trim()
      .max(15, 'Maximum 15 character allow.')
      .required('Last Name is required')
    // designation: Yup.string()
    //   .trim()
    //   .required('Designation is required'),
    // gender: Yup.string().required('Gender is require')
  })

  const onSubmitEvent = values => {
    updateUserApi(values)
    document.getElementById('form').reset()
    props.toggleModel()
  }

  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedReportingPersons, setSelectedReportingPersons] = useState()
  const handleChange = selectedOptionByUser => {
    setSelectedOption(selectedOptionByUser)
    setSelectedReportingPersons(
      Array.isArray(selectedOptionByUser)
        ? selectedOptionByUser.map(option => option.value)
        : []
    )
  }

  //! fetch Reporting Persons from api
  const ReportingPersons = async () => {
    const response = await axios.get('/api/auth/reporting-person-list', {
      headers: {
        authorization: token
      }
    })
    setReportingPersons(response.data.data)
  }

  const Get_id = async () => {
    const idResponse = await axios.get('/api/auth/me', {
      headers: {
        authorization: token
      }
    })
    
    setId(idResponse.data.data._id);
    
  }

  useEffect(() => {
    ReportingPersons()
    Get_id()
  }, [])

  const changePassword = () => {
    history.push('/Change_password')
  }

  return (
    <>
      <CRow>
        <CCol md='12'>
          <CCard>
            <CCardHeader>
              Update Profile
              <div className='card-header-actions'>
                <button
                  className='btn btn-primary'
                  onClick={changePassword}
                  type='submit'
                >
                  Change Password
                </button>
              </div>
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol md='12'>
                  <Formik
                    initialValues={{
                      fname: '',
                      mname: '',
                      lname: '',
                      email: ''
                      // designation: '',
                      // role: 'Admin',
                      // department: 'Engineering',
                      // gender: '',
                      // reportingPerson: ''
                    }}
                    validationSchema={validate}
                    onSubmit={onSubmitEvent}
                  >
                    {formik => (
                      <Form id='form'>
                        <CRow>
                          <CCol md='6'>
                            <CFormGroup>
                              <TextField
                                label='First Name'
                                name='fname'
                                type='text'
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol md='6'>
                            <CFormGroup>
                              <TextField
                                label='Middle Name'
                                name='mname'
                                type='text'
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol md='12'>
                            <CFormGroup>
                              <TextField
                                label='Last Name'
                                name='lname'
                                type='text'
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol md='12'>
                            <CFormGroup>
                              <TextField
                                label='Email'
                                name='email'
                                type='email'
                              />
                            </CFormGroup>
                          </CCol>
                          {/* <CCol md='12'>
                            <CFormGroup>
                              <TextField
                                label='Designation'
                                name='designation'
                                type='text'
                              />
                            </CFormGroup>
                          </CCol>

                          <CCol md='6'>
                            <Field
                              name='department'
                              render={({ field }) => {
                                return (
                                  <>
                                    <CFormGroup>
                                      <CLabel htmlFor='department'>
                                        Department
                                      </CLabel>
                                      <CSelect
                                        {...field}
                                        custom
                                        name='department'
                                        id='department'
                                      >
                                        <option value='Engineering'>
                                          Engineering
                                        </option>
                                        <option value='HR'>HR</option>
                                        <option value='Business Development'>
                                          Business Development
                                        </option>
                                      </CSelect>
                                    </CFormGroup>
                                  </>
                                )
                              }}
                            ></Field>
                          </CCol>

                          <CCol md='6'>
                            <Field
                              name='role'
                              render={({ field }) => {
                                return (
                                  <>
                                    <CFormGroup>
                                      <CLabel htmlFor='role'>Role</CLabel>
                                      <CSelect                      <CLabel>Gender</CLabel>
           
                                        {...field}
                                        custom
                                        name='role'
                                        id='role'
                                      >
                                        <option value='Admin'>Admin</option>
                                        <option value='Employee'>
                                          Employee
                                        </option>
                                      </CSelect>
                                    </CFormGroup>
                                  </>
                                )
                              }}
                            ></Field>
                          </CCol>

                          <CCol md='12'>
                            <CLabel>Reporting Person</CLabel>
                            <Select
                              isMulti
                              value={selectedOption}
                              onChange={handleChange}
                              options={reportingPersons}
                            />
                          </CCol>                      <CLabel>Gender</CLabel>
           

                          <CCol md='12' className='mt-2'>
                            <CFormGroup row>
                              <CCol md='2'>
                                <CLabel>Gender</CLabel>
                              </CCol>
                              <CCol md='10'>
                                <Field
                                  name='gender'
                                  render={({ field }) => {
           /api/auth/user-list                             <CFormGroup
                                          variant='custom-radio'
                                          inline
                                        >
                                          <CInputRadio
                                            {...field}
                                            custom
                                            id='update-male'
                                            name='gender'
                                            value='Male'
                                          />
                                          <CLabel
                                            variant='custom-checkbox'
                                            htmlFor='update-male'
                                          >
                                            Male
                                          </CLabel>
                                        </CFormGroup>
                                        <CFormGroup
                                          variant='custom-radio'
                                          inline
                                        >
                                          <CInputRadio
                                            {...field}
                                            custom
                                            id='update-female'
                                            name='gender'
                                            value='Female'
                                          />
                                          <CLabel
                                            variant='custom-checkbox'
                                            htmlFor='update-female'
                                          >
                                            Female
                                          </CLabel>
                                        </CFormGroup>
                                        <CFormGroup
                                          variant='custom-radio'
                                          inline
                                        >
                                          <CInputRadio
                                            {...field}
                                            custom
                                            id='update-others'
                                            name='gender'
                                            value='Other'
                                          />
                                          <CLabel
                                            variant='custom-checkbox'
                                            htmlFor='update-others'
                                          >
                                            Others
                                          </CLabel>
                                        </CFormGroup>
                                      </>
                                    )
                                  }}
                                ></Field>
                              </CCol>
                            </CFormGroup>
                          </CCol> */}

                          <CCol md='12'>
                            <button
                              className='btn btn-primary btn-block'
                              type='submit'
                              disabled={!(formik.isValid && formik.dirty)}
                            >
                              {' '}
                              Update Profile
                            </button>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default User_profile
