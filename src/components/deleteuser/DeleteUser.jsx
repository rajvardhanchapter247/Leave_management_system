import React from 'react'
import {
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '../storage/LocalStorage'
const DeleteUser = (props) => {
    const token = getToken();

    const deleteUserApi = async () => {
        console.log(props.deleteId);
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
                    <h5 className="text-center">You want to delete this user?</h5>
                </CModalBody>
                <CModalFooter>
                    <button className="btn btn-danger" onClick={deleteUser}>Yes</button>
                    <button className="btn btn-success" onClick={props.toggleModel}>No</button>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default DeleteUser
