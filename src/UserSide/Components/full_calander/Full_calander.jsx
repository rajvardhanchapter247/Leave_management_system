import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import {
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CContainer,
  CTextarea
} from '@coreui/react'
import axios from 'axios'
import { getToken } from '..//../storage/Local_Storage';


export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    primary: false
  }
  constructor(props) {
    super(props);
    this.state = {
      startdate: "",
      enddate: "",
      reason: ""
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }



  onSubmitForm(e) {

    e.preventDefault();


    var start = new Date(this.state.startdate);
    var end = new Date(this.state.enddate);

    var dateArry = [];
    // loop for every day
    for (var day = start; day <= end; day.setDate(day.getDate() + 1)) {

      // console.log(day);
      var todayDate = new Date(day).toISOString().slice(0, 10);
      console.log(todayDate);

      dateArry.push(todayDate);



    }
    console.log(dateArry);



    const token = getToken();
    axios
      .post('/api/leave-request/add', {
        datesToRequest: dateArry,
        reason: this.state.reason
      }, {
        headers: {
          'authorization': token,
        }
      })
      .then(response => {
        console.log(response);
        alert("Submit leave request")
      })
      .catch(error => {
        console.log(error);
      })


    this.setState(prevState => ({
      primary: !prevState.primary
    }))

  }


  setCalenderState = () => {
    this.setState(prevState => ({
      primary: !prevState.primary
    }))
  }





  render() {

    const { date, reason } = this.state

    return (
      <>

        {/* Full calander start here */}

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={this.state.weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={this.handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        />


        {/* Full calander end here */}




        {/* modal start here */}

        <CContainer>
          <CModal
            show={this.state.primary}
            onClose={this.setCalenderState}
            color="primary"
          >
            <CForm >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CCol md="12">
                    <CFormGroup>
                      <CLabel>Leave reason</CLabel>
                      <CTextarea id="leave" type="text" name="reason" value={reason}
                        onChange={this.onInputchange} placeholder="" required />
                    </CFormGroup>
                  </CCol>
                  <CCol md="12">
                    <CFormGroup>
                      <CLabel>Leave start date - to end date</CLabel>
                      <CInput id="" type="text" defaultValue={this.state.date} placeholder="" />
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CFormGroup>
                  <CButton color="secondary" onClick={this.setCalenderState}>
                    Cancle
                  </CButton>
                </CFormGroup>
                <CFormGroup>
                  <CButton color="primary" onClick={this.onSubmitForm}>
                    Submit
                  </CButton>
                </CFormGroup>
              </CModalFooter>
            </CForm>
          </CModal>
        </CContainer>

        {/* modal end here */}

      </>
    )
  }



  handleDateSelect = (selectInfo) => {
    this.setState(
      this.setState(prevState => ({
        primary: !prevState.true
      }))
    )

    let title = this.state.reason

    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }

    const start_date = selectInfo.startStr;
    const end_date = selectInfo.endStr;
    var date_arry = [start_date, end_date]
    // console.log('date_arry: ', date_arry);


    this.setState(prevState => ({
      startdate: `${start_date}`,
      enddate: `${end_date}`
    }))

  }



  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}