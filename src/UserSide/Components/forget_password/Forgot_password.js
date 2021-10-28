import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField } from '../../Components/text_field/TextField'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { setUserSession, getToken } from '../../storage/Local_Storage'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const Forgot_password = () => {
  const history = useHistory();
  const [error, setError] = useState(null)
  const token = getToken()
  useEffect(() => {
    // if (token === null) {
    //   history.push("/login")
    // } else {
    //   history.push("/dashboard")
    // }
  }, [])

  const validate = Yup.object({
    oldPassword: Yup.string()
      .trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    newPassword: Yup.string()
      .trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
      passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  })

  const sendGetRequest = async data => {
    // setError(null)
    try {
      const response = await axios.put(
        '/api/auth/change-password',
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        },
        {
          headers: {
            authorization: token
          }
        }
      )
      alert(response.data.message)
      // setUserSession(response.data.token, response.data.data.role)
      history.push('/User_profile');
    } catch (error) {
      // Handle Error Here
      setError('Something went wrong Please try again !')
      // alert(error)
    }
  }

  const onSubmitEvent = values => {
    console.log('submit data', values)
    sendGetRequest(values)
    document.getElementById('form').reset()
  }

  return (
    <>
      <div className='flex-row align-items-center'>
        <CContainer>
          <CRow className='justify-content-center'>
            <CCol md='12'>
              <CCardGroup>
                <CCard>
                  <CCardBody>
                    <p className='text-muted'>Change your password</p>
                    <Formik
                      initialValues={{
                        oldPassword: '',
                        newPassword: ''
                      }}
                      validationSchema={validate}
                      onSubmit={onSubmitEvent}
                    >
                      {formik => (
                        <Form id='form'>
                          <TextField
                            label='Old Password'
                            name='oldPassword'
                            type='password'
                          />
                          <TextField
                            label='New Password'
                            name='newPassword'
                            type='password'
                          />
                          <TextField
                            label='Confirm Password'
                            name='passwordConfirmation'
                            type='password'
                          />
                          {error && <div className='error-1'>{error}</div>}
                          <button
                            className='btn btn-primary mt-3'
                            type='submit'
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            Change Password
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Forgot_password
