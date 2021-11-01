import React, { useState } from 'react'
import {
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
    const token = getToken();

    const updateLeaveStatus = async (updatedStatus) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`/api/leave-request/update-status/${props.statusId}`, {
                status: updatedStatus
            }, {
                headers: {
                    'authorization': token
                }
            });
            console.log("Successfully", response);
        } catch (error) {
            console.log("Something went wrong!", error)
        }
        props.reloadPage();
        setIsLoading(false);
    }

    const approve = (updateStatus) => {
        console.log("approve");
        if (props.statusId !== null && props.statusId !== undefined) {
            updateLeaveStatus(updateStatus);
        }
        props.toggleModel();
    }
    const reject = (updateStatus) => {
        console.log("reject");
        if (props.statusId !== null && props.statusId !== undefined) {
            updateLeaveStatus(updateStatus);
        }
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
                    <CModalTitle>Leave Requests</CModalTitle>
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
                        <button className="btn btn-success" onClick={() => approve("Approved")} disabled={(isLoading ? true : false)} > Approve</button>
                        <button className="btn btn-danger" onClick={() => reject("Disapproved")} disabled={(isLoading ? true : false)}> Reject</button>
                    </CModalFooter>
                }
            </CModal>
        </>
    )
}

export default LeaveRequestModel
