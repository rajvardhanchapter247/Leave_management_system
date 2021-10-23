import React, { useState } from 'react'
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
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'

const UserDetails = (props) => {

    const token = getToken();
    const [singleUser, setSingleUser] = useState([]);
    const [reportingPerson, setReportingPerson] = useState([]);

    //! fetch users list from api
    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/auth/user-view/${props.userDetailsId}`, {
                headers: {
                    'authorization': token
                }
            });
            setSingleUser(response.data.data[0]);
            setReportingPerson(response.data.data[0].reportingPerson);
            console.log("data", reportingPerson);
        } catch (error) {
            console.log(error)
        }
    }


    if (props.showHide === true) {
        fetchUser();
    }

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
                    <CRow>
                        <CCol md="6">
                            <CFormGroup>
                                <CLabel htmlFor="fname">Name</CLabel>
                                <CInput value={singleUser.firstName} disabled />
                            </CFormGroup>
                        </CCol>
                        <CCol md="6">
                            <CFormGroup>
                                <CLabel htmlFor="mname">Middle Name</CLabel>
                                <CInput value={singleUser.middleName} disabled />
                            </CFormGroup>
                        </CCol>
                        <CCol md="6">
                            <CFormGroup>
                                <CLabel htmlFor="lname">Last Name</CLabel>
                                <CInput value={singleUser.lastName} disabled />
                            </CFormGroup>
                        </CCol>
                        <CCol md="6">
                            <CFormGroup>
                                <CLabel htmlFor="email">Email</CLabel>
                                <CInput value={singleUser.email} disabled />
                            </CFormGroup>
                        </CCol>
                        <CCol md="12">
                            <CFormGroup>
                                <CLabel htmlFor="designation">Designation</CLabel>
                                <CInput value={singleUser.designation} disabled />
                            </CFormGroup>
                        </CCol>
                        <CCol md="6">
                            <CFormGroup>
                                <CLabel htmlFor="department">Department</CLabel>
                                <CInput value={singleUser.department} disabled />
                            </CFormGroup>
                        </CCol>
                        <CCol md="6">
                            <CFormGroup>
                                <CLabel htmlFor="role">Role</CLabel>
                                <CInput value={singleUser.role} disabled />
                            </CFormGroup>
                        </CCol>
                        <CCol md="12">
                            <CFormGroup>
                                <CLabel htmlFor="reportingPerson">Reporting Person</CLabel>
                                <CInput value={reportingPerson.map(person => person)} disabled />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default UserDetails
