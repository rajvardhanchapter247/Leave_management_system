import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge
} from '@coreui/react'
import axios from 'axios'
import moment from 'moment'
// import dateformat from 'dateformat'
import { getToken } from '../../storage/Local_Storage'
import { getDateTime } from '../../../common/constant'
import Select from 'react-select';
import LeaveRequestModel from '../leaverequestModel/LeaveRequestModel'


const fields = ['name', 'datesToRequest', 'reason', 'status']

const LeaveRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [reportingPersonsList, setReportingPersonsList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const token = getToken()

  const handleChange = (selectedOptionByUser) => {
    setSelectedOption(selectedOptionByUser.value);
  };

  useEffect(() => {
    //! fetch Leave Requests users list from api
    const fetchLeaveRequestUsers = async () => {
      setIsLoading(true);
      const response = await axios.get(`/api/leave-request/list?limit=100&userId=${selectedOption}`, {
        headers: {
          authorization: token
        }
      })
      setLeaveRequests(response.data.data)
      setIsLoading(false);
    }
    fetchLeaveRequestUsers()
  }, [selectedOption])

  useEffect(() => {
    //! fetch Reporting Persons from api
    const ReportingPersons = async () => {
      const response = await axios.get('/api/auth/reporting-person-list', {
        headers: {
          'authorization': token
        }
      })
      setReportingPersonsList(response.data.data);
    }
    ReportingPersons();
  }, []);

  // ! status model
  const [statusModelToggle, setStatusModelToggle] = useState(false);
  const [statusId, setStatusId] = useState();
  const [status, setStatus] = useState();
  const leaveStatus = (statusId, buttonStatus) => {
    setStatusId(statusId);
    setStatusModelToggle(!statusModelToggle);
    setStatus(buttonStatus);
  }

  return (
    <>
      <CCard>
        <CCardHeader>Leave Requests</CCardHeader>
        <CCardHeader>
          <CRow>
            <CCol md="12">
              <Select
                isSearchable={true}
                value={selectedOption}
                onChange={handleChange}
                options={reportingPersonsList}
              />
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={leaveRequests}
            fields={fields}
            itemsPerPage={10}
            pagination
            hover
            border
            outlined
            loading={isLoading}
            scopedSlots={{
              name: item => (
                <td className="text-capitalize">{item.fullName}</td>
              ),
              datesToRequest: item => (
                <td className='text-capitalize'>
                  {item.datesToRequest.map(date => getDateTime(date))}
                </td>
              ),
              reason: item => (
                <td className="text-capitalize">{item.reason}</td>
              ),
              status: item => (
                <td>
                  {
                    localStorage.getItem('role') === "Admin"
                      ?
                      item.status === "Approved" ? <CBadge color="success" className="pointer" onClick={() => leaveStatus(item._id, item.status)}>
                        {item.status}
                      </CBadge> : item.status === "Disapproved" ? <CBadge color="danger" className="pointer" onClick={() => leaveStatus(item._id, item.status)}>
                        {item.status}
                      </CBadge> : <CBadge color="primary" className="pointer" onClick={() => leaveStatus(item._id, item.status)}>
                        {item.status}
                      </CBadge>
                      :
                      item.status === "Approved" ? <CBadge color="success" >
                        {item.status}
                      </CBadge> : item.status === "Disapproved" ? <CBadge color="danger" >
                        {item.status}
                      </CBadge> : <CBadge color="primary" >
                        {item.status}
                      </CBadge>
                  }
                </td>
              )
            }}
          />
        </CCardBody>
      </CCard>
      <LeaveRequestModel toggleModel={leaveStatus} showHide={statusModelToggle} statusId={statusId} status={status} />
    </>
  )
}

export default LeaveRequests
