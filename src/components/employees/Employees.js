import React from 'react'
import { CCol, CRow, CWidgetIcon } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const users = [
    { id: 1, name: "Vijay Vishwakarma", job: "Frontend Developer" },
    { id: 2, name: "Pawan Rajpoot", job: "Web Developer" },
    { id: 3, name: "Nilesh Khandway", job: "Javascript Developer" },
    { id: 4, name: "Rupesh Patil", job: "Python Developer" },
    { id: 5, name: "Gagan Shukla", job: "Java Developer" },
    { id: 6, name: "Aadiya Patel", job: "ROR Developer" },
    { id: 7, name: "Sachin Raghuvanshi", job: "Vue.js Developer" },
    { id: 8, name: "Sourabh Nayak", job: "Frontend Developer" },
    { id: 9, name: "Aakash Chouhan", job: "Php Developer" },
    { id: 10, name: "Ankit Kumawat", job: "Backend Developer" },
];

const Widgets = () => {
    return (
        <>
            <h1>Welcome Admin!</h1>
            <h3 className="my-3">Employees / All</h3>

            {/* All Employees Section */}
            <CRow>
                {
                    users.map((user, index) => <CCol sm="12" md="6" key={index}> <CWidgetIcon text={user.job} header={user.name} color="primary">
                        <CIcon width={24} name="cil-user" />
                    </CWidgetIcon>
                    </CCol>
                    )
                }
            </CRow>
        </>
    )
}

export default Widgets
