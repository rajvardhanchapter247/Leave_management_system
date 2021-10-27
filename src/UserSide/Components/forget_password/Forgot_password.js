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

const Forgot_password = () => {
//   const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token === null) {
    //   history.push("/login")
    } else {
    //   history.push("/dashboard")
    }
  }, [])

  const validate = Yup.object({
    password: Yup.string().trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password: Yup.string().trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const sendGetRequest = async (data) => {
    setError(null);
    try {
      const response = await axios.post("/api/auth/login", {
        newPassword: data.password,
        oldPassword: data.password
      });
      setUserSession(response.data.token, response.data.data.role);
    //   history.push('/dashboard');
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
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="10">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <p className="text-muted">Change your password</p>
                    <Formik
                      initialValues={{
                        password: '',
                        password: '',
                      }}
                      validationSchema={validate}
                      onSubmit={onSubmitEvent}
                    >
                      {formik => (
                        <Form id="form">
                          <TextField label="New Password" name="newpassword" type="password" />
                          <TextField label="Old password" name="oldpassword" type="password" />
                          {error && <div className="error-1">{error}</div>}
                          <button className="btn btn-primary mt-3" type="submit" disabled={!(formik.isValid && formik.dirty)}>Submit</button>
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