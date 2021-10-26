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
    CInput,
    CForm,
    CInputRadio
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'

const UserDetails = (props) => {

    const token = getToken();
    const [singleUser, setSingleUser] = useState([]);
    const [reportingPersons, setReportingPersons] = useState([]);

    //! fetch users list from api
    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/auth/user-view/${props.userDetailsId}`, {
                headers: {
                    'authorization': token
                }
            });
            setSingleUser(response.data.data[0]);
            setReportingPersons(response.data.data[0].reportingPerson);
            console.log(reportingPersonsCollection);

            // console.log("data", reportingPerson);
        } catch (error) {
            console.log(error)
        }
    }

    const [reportingPersonsCollection, setReportingPersonsCollection] = useState([]);

    // // ! fetch reporting persons data
    // const fetchReportingPersonsApi = async () => {
    //     try {
    //         const response = await axios.get(`/api/auth/reporting-person-list`, {
    //             headers: {
    //                 'authorization': token
    //             }
    //         })
    //         setReportingPersonsCollection(response.data.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const arr = reportingPersons.map(person => person)
    // console.log("data of array", arr);
    // fetchReportingPersonsApi();

    useEffect(() => {
        if (props.showHide === true) {
            fetchUser();
        }
    }, [props.userDetailsId])

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
                    <CModalTitle>User Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <fieldset disabled>
                            <CRow>
                                <CCol md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="fname">Name</CLabel>
                                        <CInput defaultValue={singleUser.firstName} />
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="mname">Middle Name</CLabel>
                                        <CInput defaultValue={singleUser.middleName} />
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="lname">Last Name</CLabel>
                                        <CInput defaultValue={singleUser.lastName} />
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="email">Email</CLabel>
                                        <CInput defaultValue={singleUser.email} />
                                    </CFormGroup>
                                </CCol>
                                <CCol md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="designation">Designation</CLabel>
                                        <CInput defaultValue={singleUser.designation} />
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="department">Department</CLabel>
                                        <CInput defaultValue={singleUser.department} />
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="role">Role</CLabel>
                                        <CInput defaultValue={singleUser.role} />
                                    </CFormGroup>
                                </CCol>
                                <CCol md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="reportingPerson">Reporting Person</CLabel>
                                        <CInput defaultValue={reportingPersons.map(person => person)} />
                                    </CFormGroup>
                                </CCol>

                                <CCol md="2">
                                    <CLabel>Gender</CLabel>
                                </CCol>
                                <CCol md="10">
                                    <CFormGroup variant="custom-radio" inline>
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
                                </CCol>
                            </CRow>
                        </fieldset>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    )
}

export default UserDetails
