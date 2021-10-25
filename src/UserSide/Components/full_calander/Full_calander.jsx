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
  CContainer
} from '@coreui/react'


export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    primary: false,
    date: "",
    reason : ""
  }
  setCalenderState = () => {
    this.setState(
      {
        ...this.state,
        primary: !this.state.primary
      }
    )
  }

  render() {
    return (
      <>

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
        <CContainer>
          <CModal
            show={this.state.primary}
            onClick={this.setCalenderState}
            color="primary"
          >
            <CForm>
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CCol md="12">
                    <CFormGroup>
                      <CLabel>Leave reason</CLabel>
                      <CInput id="leave" type="text"  placeholder="" required/>
                    </CFormGroup>
                  </CCol>
                  <CCol md="12">
                    <CFormGroup>
                      <CLabel>Leave start date - to end date</CLabel>
                      <CInput id="" type="text" defaultValue={this.state.date} placeholder="" required/>
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
                  <CButton color="primary" onClick={this.setCalenderState}>
                    Submit
                  </CButton>
                </CFormGroup>
              </CModalFooter>
            </CForm>
          </CModal>
        </CContainer>

      </>
    )
  }



  handleDateSelect = (selectInfo) => {
    this.setState(
      {
        ...this.state,
        primary: true
      }
    )
    let title = ""
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
    this.props.captureDate(date_arry);
    this.props.captureReason(title);
   
    this.setState({
      ...this.state,
      date :`${start_date} to ${end_date}`
    })

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

