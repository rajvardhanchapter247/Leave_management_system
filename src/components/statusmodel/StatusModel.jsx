import React, { useState } from 'react'
import {
    CCol,
    CRow,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CSpinner
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
import Loader from '../../containers/Loader/Loader'

const StatusModel = (props) => {
    const status = props.status === "Active";
    const [isLoading, setIsLoading] = useState(false);
    var token = getToken();
    const updateStatus = async () => {
        setIsLoading(true);
        try {
            await axios.patch(`/api/auth/update-status/${props.statusId}`, { status: status ? "Inactive" : "Active" }, {
                headers: {
                    'authorization': token
                },
            });
        } catch (error) {
            console.log(error);
        }
        props.reloadPage();
        setIsLoading(false);
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
                            <h5 className="text-center ">Are you sure you want to change status
                                <span className={`font-weight-bold ${status ? "text-success" : "text-primary"}`}>{status ? " Active" : " Inactive"}</span> to <span className={`font-weight-bold ${status ? "text-primary" : "text-success"}`}>{status ? " Inactive" : " Active"}</span> ?</h5>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    {
                        isLoading ?
                            <button className="btn btn-primary btn-block " disabled>
                                <CSpinner component="span" size="sm" aria-hidden="true" className="mr-2" />
                                Loading...
                            </button>
                            :
                            <button className="btn btn-primary btn-block" onClick={updateStatus}
                                disabled={(isLoading ? true : false)}> Yes</button>
                    }
                    {
                        isLoading ?
                            <button className="btn btn-danger btn-block " disabled>
                                <CSpinner component="span" size="sm" aria-hidden="true" className="mr-2" />
                                Loading...
                            </button>
                            :
                            <button className="btn btn-danger btn-block" onClick={props.toggleModel}
                                disabled={(isLoading ? true : false)}> No</button>
                    }
                </CModalFooter>
            </CModal>
        </>
    )
}

export default StatusModel

