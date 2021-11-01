import React, { useState } from 'react'
import {
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
import Loader from '../../containers/Loader/Loader'
const DeleteUser = (props) => {
    var token = getToken();
    const [isLoading, setIsLoading] = useState(false);

    const deleteUserApi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`/api/auth/delete-user/${props.deleteId}`, {
                headers: {
                    "authorization": token
                }
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        props.toggleModel();
        setIsLoading(false);
    }

    const deleteUser = () => {
        deleteUserApi();
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
                    <CModalTitle>Delete user</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        isLoading ?
                            <div style={{ height: "7vh" }}>
                                <Loader />
                            </div>
                            :
                            <h5 className="text-center">You want to delete this user?</h5>

                    }
                </CModalBody>
                <CModalFooter>
                    <button className="btn btn-danger" onClick={deleteUser} disabled={(isLoading ? true : false)}>Yes</button>
                    <button className="btn btn-success" onClick={props.toggleModel} disabled={(isLoading ? true : false)}>No</button>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default DeleteUser
