import React from 'react'
import {
    CCol,
    CRow,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'

const StatusModel = (props) => {
    const token = getToken();
    const updateStatus = async () => {
        try {
            await axios.patch(`/api/auth/update-status/${props.statusId}`, { status: props.status === "Active" ? "Inactive" : "Active" }, {
                headers: {
                    'authorization': token
                },
            });
        } catch (error) {
            console.log(error);
        }
        props.toggleModel();
    }

    return (
        <>
            <CModal
                show={props.showHide}
                onClose={props.toggleModel}
                color="primary"
                className="model"
                tabIndex="-1"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Update Status</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            <h5 className="text-center ">Are you sure you want to change status <span className={`font-weight-bold ${props.status === "Active" ? "text-success" : "text-primary"}`}>{props.status === "Active" ? "Active" : "Inactive"}</span> to <span className={`font-weight-bold ${props.status === "Active" ? "text-primary" : "text-success"}`}>{props.status === "Active" ? "Inactive" : "Active"}</span> ?</h5>
                        </CCol>
                    </CRow>
                </CModalBody>

                <CModalFooter>
                    <button className="btn btn-success" onClick={updateStatus} >Yes</button>
                    <button className="btn btn-primary" onClick={props.toggleModel}>No</button>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default StatusModel

