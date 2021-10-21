import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CLabel,
    CSelect,
    CInputRadio,
} from '@coreui/react'

import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../pages/login/TextField'
import Select from 'react-select';


const AddUser = (props) => {
    const [reportingPersons, setReportingPersons] = useState([]);
    const token = getToken();

    useEffect(() => {
        ReportingPersons();
    }, []);


    //! fetch Reporting Persons from api
    const ReportingPersons = async () => {
        const response = await axios.get('/api/auth/reporting-person-list', {
            headers: {
                'authorization': token
            }
        })
        setReportingPersons(response.data.data);
    }
    console.log("Reporting Persons", reportingPersons);

    const validate = Yup.object({
        email: Yup.string().trim()
            .email('Email is invalid')
            .required('Email is required'),
        fname: Yup.string().trim()
            .max(15, 'Maximum 15 character allow.')
            .required('First Name is required'),
        lname: Yup.string().trim()
            .max(15, 'Maximum 15 character allow.')
            .required('Last Name is required'),
        gender: Yup.string().required("Gender is require"),
        reportingPerson: Yup.string().trim()
            .max(15, 'Maximum 15 character allow.')
            .required('Reporting Person is required'),
    })

    const addUser = async (data) => {
        try {
            const response = await axios.post('/api/auth/add-user', {
                firstName: data.fname,
                middleName: data.mname,
                lastName: data.lname,
                email: data.email,
                department: data.department,
                role: data.role,
                reportingPerson: selectedReportingPersons,
                gender: data.gender,
            }, {
                headers: {
                    'authorization': token
                },
            });
            console.log(response);
        } catch (error) {
            // Handle Error Here
            console.log("Something went wrong Please try again !");
            console.log("error ==>" + error);
        }
    };

    const onSubmitEvent = (values) => {
        console.log("submit data", values);
        addUser(values);
        document.getElementById("form").reset();
    }

    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedReportingPersons, setSelectedReportingPersons] = useState();

    const handleChange = (selectedOptionByUser) => {
        setSelectedOption(selectedOptionByUser);
        setSelectedReportingPersons(Array.isArray(selectedOptionByUser) ? selectedOptionByUser.map(option => option.value) : []);
    };

    // const closeModel = () => {

    // }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardBody>
                            <CModal
                                show={props.toggleModel}
                                // onClose={closeModel}
                                color="primary"
                                className="modal"
                                tabIndex="-1"
                            >
                                {/* <CForm> */}
                                <CModalHeader closeButton>
                                    <CModalTitle>Create user</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CRow>
                                        <CCol md="12">
                                            <Formik
                                                initialValues={{
                                                    fname: '',
                                                    mname: '',
                                                    lname: '',
                                                    email: '',
                                                    department: '',
                                                    role: '',
                                                    gender: '',
                                                }}
                                                validationSchema={validate}
                                                onSubmit={onSubmitEvent}
                                            >
                                                {formik => (
                                                    <Form id="form">
                                                        <CRow>
                                                            <CCol md="6">
                                                                <CFormGroup>
                                                                    <TextField label="First Name" name="fname" type="text" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol md="6">
                                                                <CFormGroup>
                                                                    <TextField label="Middle Name" name="mname" type="text" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol md="6">
                                                                <CFormGroup>
                                                                    <TextField label="Last Name" name="lname" type="text" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol md="6">
                                                                <CFormGroup>
                                                                    <TextField label="Email" name="email" type="email" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol md="12">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="department">Department</CLabel>
                                                                    <CSelect custom name="department" id="department">
                                                                        <option value="'Engineering'">'Engineering'</option>
                                                                        <option value="HR">HR</option>
                                                                        <option value="Business Development">Business Development</option>
                                                                    </CSelect>
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol md="12">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="role">Role</CLabel>
                                                                    <CSelect custom name="role" id="role">
                                                                        <option value="Admin">Admin</option>
                                                                        <option value="Employee">Employee</option>
                                                                    </CSelect>
                                                                </CFormGroup>
                                                            </CCol>


                                                            <CCol md="12">
                                                                <CLabel>Reporting Person</CLabel>
                                                                <Select
                                                                    isMulti
                                                                    value={selectedOption}
                                                                    onChange={handleChange}
                                                                    options={reportingPersons}
                                                                />
                                                            </CCol>

                                                            <CCol md="12" className="mt-2">
                                                                <CFormGroup row>
                                                                    <CCol md="2">
                                                                        <CLabel>Gender</CLabel>
                                                                    </CCol>
                                                                    <CCol md="10">
                                                                        <CFormGroup variant="custom-radio" inline>
                                                                            <CInputRadio custom id="male" name="gender" value="Male" />
                                                                            <CLabel variant="custom-checkbox" htmlFor="male">Male</CLabel>
                                                                        </CFormGroup>
                                                                        <CFormGroup variant="custom-radio" inline>
                                                                            <CInputRadio custom id="female" name="gender" value="Female" />
                                                                            <CLabel variant="custom-checkbox" htmlFor="female">Female</CLabel>
                                                                        </CFormGroup>
                                                                        <CFormGroup variant="custom-radio" inline>
                                                                            <CInputRadio custom id="others" name="gender" value="Others" />
                                                                            <CLabel variant="custom-checkbox" htmlFor="others">Others</CLabel>
                                                                        </CFormGroup>

                                                                        <ErrorMessage component="span" name="gender" className="error font-sm" />
                                                                    </CCol>
                                                                </CFormGroup>
                                                            </CCol>

                                                            <CCol md="12">
                                                                <button className="btn btn-primary btn-block" type="submit" disabled={!(formik.isValid && formik.dirty)}>Submit</button>
                                                            </CCol>
                                                        </CRow>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </CCol>
                                    </CRow>
                                </CModalBody>
                            </CModal>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {/* Modal end here */}

        </>
    )
}

export default AddUser