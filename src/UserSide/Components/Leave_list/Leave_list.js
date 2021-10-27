import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge
} from '@coreui/react';
import axios from 'axios';
import moment from 'moment'
import { getToken } from '../../storage/Local_Storage'



const fields = ['fullName', 'datesToRequest', 'reason', 'status']



const Leave_list = () => {
  const [toggle, setToggle] = useState(false)
  const [usersList, setUsersList] = useState([]);
  const token = getToken();

  useEffect(() => {
    fetchUsers();
  });

  //! fetch users list from api
  const fetchUsers = async () => {
    const response = await axios.get(`/api/leave-request/list`, {
      headers: {
        'authorization': token
      }
    });

    setUsersList(response.data.data);
  }

  
  const getDateTime = (data) => {
    return moment(data).format("YYYY-MM-DD , ");
  };
  
  
  

  
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              Users List
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersList}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  'name':
                    (item) => (
                      <td className="text-capitalize">
                        {item.fullName}
                      </td>
                    ),
                    'datesToRequest':
                    (item) => (
                      <td className="text-capitalize">
                        {item.datesToRequest.map(date => getDateTime(date))}
                      </td>
                    ),
                    
                  'status':
                    (item) => (
                      <td>
                        {
                          item.status === "Active" ?
                            <CBadge color="success" className="pointer">
                              {item.status}
                            </CBadge> :
                            <CBadge color="primary" className="pointer">
                              {item.status}
                            </CBadge>
                        }
                      </td>
                    ),
                }
                }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      

    </>
  )
}

export default Leave_list;


