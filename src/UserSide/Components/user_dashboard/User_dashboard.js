import { CCard, CRow, CCardBody, CCol, CCardHeader, CForm, CFormGroup, CLabel, CInput } from '@coreui/react'
import React from 'react'
import Full_calander from '../full_calander/Full_calander.jsx'



const User_dashboard = () => {
    return (
        <>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Add leave
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow>
                                    <CCol md="12">
                                        <CFormGroup>
                                            <CLabel>Leave reason</CLabel>
                                            <CInput id="" type="text" placeholder="" />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol md="12">
                                        <CFormGroup>
                                            <CLabel>Select date</CLabel>
                                            <CRow>
                                                <CCol md="12">
                                                    <Full_calander/>
                                                </CCol>
                                            </CRow>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default User_dashboard
