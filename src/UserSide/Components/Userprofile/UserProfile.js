import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CSpinner
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../../storage/Local_Storage'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField } from '../text_field/TextField'
import { useHistory } from 'react-router-dom'

const User_profile = props => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState()

  const updateUserApi = async values => {
    var token = getToken()
    setIsLoading(true)
    try {
      const response = await axios.put(
        `/api/auth/update-user/${id}`,
        {
          firstName: values.fname,
          middleName: values.mname,
          lastName: values.lname,
          email: values.email
        },
        {
          headers: {
            authorization: token
          }
        }
      )
      console.log('Update user Successfully', response)
      alert('Update user Successfully')
      history.push('/UserProfile')
    } catch (error) {
      console.log('Something went wrong!', error)
    }
    setIsLoading(false)
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
  })

  const onSubmitEvent = values => {
    updateUserApi(values)
    document.getElementById('form').reset()
  }

  useEffect(() => {
    var token = getToken()
    const Get_id = async () => {
      const response = await axios.get('/api/auth/me', {
        headers: {
          authorization: token
        }
      })
      setId(response.data.data._id)
    }
    Get_id()
  }, [])

  const changePassword = () => {
    history.push('/change-password')
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
                  className='btn btn-primary btn-sm'
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
                    }}
                    validationSchema={validate}
                    onSubmit={onSubmitEvent}
                  >
                    {formik => (
                      <Form id='form'>
                        <CRow>
                          <CCol md='12'>
                            <CFormGroup>
                              <TextField
                                label='First Name'
                                name='fname'
                                type='text'
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol md='12'>
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

                          <CCol md='12'>
                            {isLoading ? (
                              <button
                                className='btn btn-primary btn-block mt-3'
                                disabled
                              >
                                <CSpinner
                                  component='span'
                                  size='sm'
                                  aria-hidden='true'
                                  className='mr-2'
                                />
                                Loading...
                              </button>
                            ) : (
                              <button
                                className='btn btn-primary btn-block mt-3'
                                type='submit'
                                disabled={!(formik.isValid && formik.dirty)}
                              >
                                Update Profile
                              </button>
                            )}
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
