import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from "../text_field/TextField"
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { setUserSession, getToken } from '../../storage/Local_Storage';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const Login = () => {
  // const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token === null) {
      // history.push("/login")
    } else {
      // history.push("/dashboard")
    }
  }, [])

  const validate = Yup.object({
    
    password: Yup.string().trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const sendGetRequest = async (data) => {
    setError(null);
    try {
      const response = await axios.post("/api/auth/login", {
        email: data.email,
        password: data.password
      });
      setUserSession(response.data.token, response.data.data.role);
      // history.push('/dashboard');
    } catch (error) {
      // Handle Error Here
      setError("Something went wrong Please try again !");
    }
  };

  const onSubmitEvent = (values) => {
    console.log("submit data", values);
    sendGetRequest(values);
    document.getElementById("form").reset();
  }

  return (
    <>
      <div className="flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="12">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <p className="text-muted">Change password</p>
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                      }}
                      validationSchema={validate}
                      onSubmit={onSubmitEvent}
                    >
                      {formik => (
                        <Form id="form">
                          <TextField label="Old password" name="password" type="email" />
                          <TextField label="New password" name="password" type="email" />
                          <TextField label="Confirm password" name="password" type="password" />
                          {error && <div className="error-1">{error}</div>}
                          <button className="btn btn-primary mt-3" type="submit" disabled={!(formik.isValid && formik.dirty)}>Login</button>
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

export default Login

