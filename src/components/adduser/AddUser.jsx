import React, { useState, useEffect } from 'react'
import {
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
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from "../../components/textfield/TextField"
import Select from 'react-select';

const AddUser = (props) => {
    const [reportingPersons, setReportingPersons] = useState([]);
    const token = getToken();

    useEffect(() => {
        ReportingPersons();
    }, []);

    const validate = Yup.object({
        email: Yup.string().trim()
            .email('Email is invalid')
            .required('Email is required'),
        fname: Yup.string().trim()
            .max(15, 'Maximum 15 character allow.')
            .required('First Name is required'),
        mname: Yup.string("").trim(),
        lname: Yup.string().trim()
            .max(15, 'Maximum 15 character allow.')
            .required('Last Name is required'),
        designation: Yup.string().trim()
            .required('Designation is required'),
        gender: Yup.string().required("Gender is require"),
    })

    //! fetch Reporting Persons from api
    const ReportingPersons = async () => {
        const response = await axios.get('/api/auth/reporting-person-list', {
            headers: {
                'authorization': token
            }
        })
        setReportingPersons(response.data.data);
    }

    //! add user in api
    const addUser = async (data) => {
        try {
            await axios.post('/api/auth/add-user', {
                firstName: data.fname,
                middleName: data.mname,
                lastName: data.lname,
                email: data.email,
                designation: data.designation,
                role: data.role,
                department: data.department,
                reportingPerson: selectedReportingPersons,
                gender: data.gender,
            }, {
                headers: {
                    'authorization': token
                },
            });
        } catch (error) {
            // Handle Error Here
            console.log("Something went wrong Please try again !");
            console.log("error ==>" + error);
        }
    };

    const onSubmitEvent = (values, onSubmitProps) => {
        props.toggleModel();
        addUser(values);
        onSubmitProps.resetForm();
    }

    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedReportingPersons, setSelectedReportingPersons] = useState();
    const handleChange = (selectedOptionByUser) => {
        setSelectedOption(selectedOptionByUser);
        setSelectedReportingPersons(Array.isArray(selectedOptionByUser) ? selectedOptionByUser.map(option => option.value) : []);
    };

    return (
        <>
            <CModal
                show={props.showHide}
                onClose={props.toggleModel}
                color="primary"
                className="modal"
                tabIndex="-1"
            >
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
                                    designation: '',
                                    department: 'Engineering',
                                    role: 'Admin',
                                    gender: 'Other',
                                    reportingPerson: []
                                }}
                                validationSchema={validate}
                                onSubmit={onSubmitEvent}
                            >
                                {formik => (
                                    <Form id="form">
                                        <CRow>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <TextField label="First Name" placeholder="John" name="fname" type="text" />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <TextField label="Middle Name" placeholder="Steve" name="mname" type="text" />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <TextField label="Last Name" placeholder="Doe" name="lname" type="text" />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <TextField label="Email" placeholder="johndoe@gmail.com" name="email" type="email" />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="12">
                                                <CFormGroup>
                                                    <TextField label="Designation" placeholder="Senior Developer" name="designation" type="text" />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol md="6">
                                                <Field name="department" render={({ field }) => {
                                                    return <>
                                                        <CFormGroup>
                                                            <CLabel htmlFor="department">Department</CLabel>
                                                            <CSelect {...field} custom name="department" id="department">
                                                                <option value="Engineering">Engineering</option>
                                                                <option value="HR">HR</option>
                                                                <option value="Business Development">Business Development</option>
                                                            </CSelect>
                                                        </CFormGroup>
                                                    </>
                                                }}></Field>
                                            </CCol>


                                            <CCol md="6">
                                                <Field name="role" render={({ field }) => {
                                                    return <>
                                                        <CFormGroup>
                                                            <CLabel htmlFor="role">Role</CLabel>
                                                                <CSelect {...field} custom name="role" id="role">
                                                                    <option value="Admin">Admin</option>
                                                                    <option value="Employee">Employee</option>
                                                                </CSelect>
                                                        </CFormGroup>
                                                    </>
                                                }}></Field>
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
                                                        <Field name="gender" render={({ field }) => {
                                                            return <>
                                                                <CFormGroup variant="custom-radio" inline>
                                                                    <CInputRadio {...field} custom id="male" name="gender" value="Male" />
                                                                    <CLabel variant="custom-checkbox" htmlFor="male">Male</CLabel>
                                                                </CFormGroup>
                                                                <CFormGroup variant="custom-radio" inline>
                                                                    <CInputRadio {...field} custom id="female" name="gender" value="Female" />
                                                                    <CLabel variant="custom-checkbox" htmlFor="female">Female</CLabel>
                                                                </CFormGroup>
                                                                <CFormGroup variant="custom-radio" inline>
                                                                    <CInputRadio {...field} custom id="others" name="gender" value="Other" />
                                                                    <CLabel variant="custom-checkbox" htmlFor="others">Others</CLabel>
                                                                </CFormGroup>
                                                            </>
                                                        }}></Field>
                                                    </CCol>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol md="12">
                                                <button className="btn btn-primary btn-block" type="submit"
                                                    disabled={!(formik.isValid && formik.dirty)}> Submit</button>
                                            </CCol>
                                        </CRow>
                                    </Form>
                                )}
                            </Formik>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default AddUser