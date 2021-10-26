import { CCard, CRow, CCardBody, CCol, CCardHeader, CForm, CFormGroup, CLabel, CInput } from '@coreui/react'
import React from 'react'
import Full_calander from '../full_calander/Full_calander.jsx'



const User_dashboard = () => {
    const captureDate =dateRange => console.log(dateRange);
    const captureReason =dateReason => console.log(dateReason);

    const dateRange = dateRange;
    const dateReason = dateReason;

    console.log(dateRange);
    console.log(dateReason);

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
                                            <CLabel>Select date</CLabel>
                                            <CRow>
                                                <CCol md="12">
                                                    <Full_calander captureDate={captureDate} captureReason={captureReason}/>
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

