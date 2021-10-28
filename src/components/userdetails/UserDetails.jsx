import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import {
    CCol,
    CRow,
    CFormGroup,
    CLabel,
    CInput,
    CForm,
    CInputRadio,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
import Loader from '../../containers/Loader/Loader'
import { titleCase } from '../../common/constant';

const UserDetails = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const { UserId } = useParams();
    const token = getToken();
    const [singleUser, setSingleUser] = useState([]);
    const [reportingPersons, setReportingPersons] = useState([]);
    const [reportingPersonsCollection, setReportingPersonsCollection] = useState([]);

    useEffect(() => {
        fetchUser();
        fetchReportingPersonsApi();
    }, []);

    //! fetch users list from api
    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/auth/user-view/${UserId}`, {
                headers: {
                    'authorization': token
                }
            });
            setSingleUser(response.data.data[0]);
            setReportingPersons(response.data.data[0].reportingPerson);
            // console.log("data", response.data.data[0].reportingPerson);
        } catch (error) {
            console.log("Something went wrong!", error)
        }
        setIsLoading(false);
    }

    // ! fetch reporting persons data
    const fetchReportingPersonsApi = async () => {
        try {
            const response = await axios.get(`/api/auth/reporting-person-list`, {
                headers: {
                    'authorization': token
                }
            })
            setReportingPersonsCollection(response.data.data)
            // console.log("data change ", response.data.data);
        } catch (error) {
            console.log("Somethong went wrong!", error);
        }
    }

    let setReportingPersonNames = []
    for (let i = 0; i < reportingPersons.length; i++) {
        for (let j = 0; j < reportingPersonsCollection.length; j++) {
            if (reportingPersons[i] === reportingPersonsCollection[j]['value']) {
                setReportingPersonNames.push(reportingPersonsCollection[j]['label']);
            }
        }
    }


    return (
        <>
            {
                isLoading ? <Loader /> : <CRow>
                    <CCol xs="12">
                        <CCard>
                            <CCardHeader>
                                User Details
                            </CCardHeader>
                            <CCardBody>
                                <CForm>
                                    <fieldset>
                                        <CRow>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="fname">Name</CLabel>
                                                    <CInput defaultValue={singleUser.firstName} readOnly/>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="mname">Middle Name</CLabel>
                                                    <CInput defaultValue={singleUser.middleName} readOnly/>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="lname">Last Name</CLabel>
                                                    <CInput defaultValue={singleUser.lastName} readOnly/>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="email">Email</CLabel>
                                                    <CInput defaultValue={singleUser.email} readOnly/>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="12">
                                                <CFormGroup>
                                                    <CLabel htmlFor="designation">Designation</CLabel>
                                                    <CInput defaultValue={singleUser.designation} readOnly/>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="department">Department</CLabel>
                                                    <CInput defaultValue={singleUser.department} readOnly/>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="role">Role</CLabel>
                                                    <CInput defaultValue={singleUser.role} readOnly/>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="12">
                                                <CFormGroup>
                                                    <CLabel htmlFor="reportingPerson">Reporting Person</CLabel>
                                                    <CInput defaultValue={setReportingPersonNames.map(person => titleCase(person))} readOnly/>
                                                </CFormGroup>
                                            </CCol>

                                            {/* <CCol md="1">
                                                <CLabel>Gender</CLabel>
                                            </CCol>
                                            <CCol md="11">
                                                <CFormGroup variant="custom-radio" inline >
                                                    {singleUser.gender === "Male" ?
                                                        <>
                                                            <CInputRadio custom id="male" name="gender" value="Male" checked />
                                                            <CLabel variant="custom-checkbox" htmlFor="male">Male</CLabel>
                                                        </>
                                                        :
                                                        <>
                                                            <CInputRadio custom id="male" name="gender" value="Male" />
                                                            <CLabel variant="custom-checkbox" htmlFor="male">Male</CLabel>
                                                        </>
                                                    }
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    {singleUser.gender === "Female" ?
                                                        <>
                                                            <CInputRadio custom id="female" name="gender" value="Female" checked />
                                                            <CLabel variant="custom-checkbox" htmlFor="female">Female</CLabel>
                                                        </>
                                                        :
                                                        <>
                                                            <CInputRadio custom id="female" name="gender" value="Female" />
                                                            <CLabel variant="custom-checkbox" htmlFor="female">Female</CLabel>
                                                        </>
                                                    }
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    {singleUser.gender === "Other" ?
                                                        <>
                                                            <CInputRadio custom id="others" name="gender" value="Other" checked />
                                                            <CLabel variant="custom-checkbox" htmlFor="others">Others</CLabel>
                                                        </>
                                                        :
                                                        <>
                                                            <CInputRadio custom id="others" name="gender" value="Other" />
                                                            <CLabel variant="custom-checkbox" htmlFor="others">Others</CLabel>
                                                        </>
                                                    }
                                                </CFormGroup>
                                            </CCol> */}
                                        </CRow>
                                    </fieldset>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            }
        </>
    )
}

export default UserDetails
