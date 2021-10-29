import React, { useState } from 'react'
import {
    CCol,
    CRow,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter
} from '@coreui/react'
import axios from 'axios';
import { getToken } from '../../../components/storage/LocalStorage';
import Loader from '../../../containers/Loader/Loader';
const LeaveRequestModel = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const approve = () => {
        console.log("approve");
        props.toggleModel();
    }
    const reject = () => {
        console.log("reject");
        props.toggleModel();
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
                    {/*  {props.toggleModel} {props.showHide} {props.statusId} {props.status} */}
                    <CModalTitle>Leave Request</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        isLoading ?
                            <div style={{ height: "20vh" }}>
                                <Loader />
                            </div>
                            : <h5 className="text-center">Change leave request.</h5>
                    }
                </CModalBody>
                {
                    !isLoading &&
                    <CModalFooter>
                        <button className="btn btn-success" onClick={approve} disabled={(isLoading ? true : false)} > Approve</button>
                        <button className="btn btn-danger" onClick={reject} disabled={(isLoading ? true : false)}> Reject</button>
                    </CModalFooter>
                }
            </CModal>
        </>
    )
}

export default LeaveRequestModel
