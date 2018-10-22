import React, { Component } from 'react'
import './LeaveRequests.css'
import Popup from 'reactjs-popup'
import moment from 'moment'

class LeaveRequests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRequestID: '',
      LeaveRecord: JSON.parse(localStorage.getItem('Data')),
      deletedRow: [],
      open: false,
      ischecked: false,
      checkedValue: [],
      index: ''
    }
  }
  componentDidMount () {
    let data = JSON.parse(localStorage.getItem('Data'))
    if (data.deletedRow) {
      this.setState({ deletedRow: data.deletedRow })
      var date1 = moment()
      console.log(date1)
    }
  }
  closePopup (e) {
    this.setState({ open: false })
  }
  // Onclicking view button select the respective request to see the details
  sendReqId (e, i) {
    localStorage.setItem('currentRequestID', i)
  }
  // Delete the request from the list but not from the JSON
  delete (index) {
    var data = JSON.parse(localStorage.getItem('Data'))
    let reqId = this.state.LeaveRecord.leaveRequest[index].ReqestId
    if (data.deletedRow) {
      data.deletedRow[data.deletedRow.length] = reqId
      this.state.deletedRow.push(reqId)
      localStorage.setItem('Data', JSON.stringify(data))
    } else {
      data['deletedRow'] = []
      data.deletedRow[data.deletedRow.length] = reqId
      this.state.deletedRow.push(reqId)
      localStorage.setItem('Data', JSON.stringify(data))
    }
    window.location.reload(1)
  }

  // Reject leave request
  changeToReject (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.LeaveRecord.leaveRequest[index].status = 'Rejected'
    window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
    this.setState({ open: true, index: i })
    this.setState({ status: 'Rejected' })
    this.delete(index)
  }

  // Reduce number of days from employee's pending leaves, if request is approved
  reduceLeaves (id, type, days) {
    let data = this.state.LeaveRecord.Employee
    let leave, leave1, leave2, leave3
    let newState = Object.assign({}, this.state)
    for (var i = 0; i < data.length; ++i) {
      if (data[i].EmpId === id) {
        leave = data[i].PendingLeaves.Planned
        leave1 = data[i].PendingLeaves.EmergencyLeave
        leave2 = data[i].PendingLeaves.Sick
        leave3 = data[i].PendingLeaves.Privilege
        if (type === 'Casual Leave') {
          leave = leave - days
          leave > 0 ? leave = leave : leave = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.Planned = leave
        }
        if (type === 'Emergency Leave') {
          leave1 = leave1 - days
          leave1 > 0 ? leave1 = leave1 : leave1 = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.EmergencyLeave = leave1
        }
        if (type === 'Sick Leave') {
          leave2 = leave2 - days
          leave2 > 0 ? leave2 = leave2 : leave2 = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.Sick = leave2
        }
        if (type === 'Earned Leave') {
          leave3 = leave3 - days
          leave3 > 0 ? leave3 = leave3 : leave3 = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.Privilege = leave3
        }
        this.setState({ [this.state.LeaveRecord.Employee]: newState })
        localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
      }
    }
  }

  // Approve leave request
  changeToApprove (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.LeaveRecord.leaveRequest[index].status = 'Approved'
    window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
    let id = this.state.LeaveRecord.leaveRequest[index].EmpId
    let type = this.state.LeaveRecord.leaveRequest[index].LeaveType
    let days = parseInt(this.state.LeaveRecord.leaveRequest[index].TotalDays)
    this.setState({ status: 'Approved' })
    this.reduceLeaves(id, type, days)
    this.setState({ open: true })
    this.delete(index)
  }

  selectAll (e) {
    var inputElements = document.getElementsByClassName('selectcheckbox')
    for (var i = 0; inputElements[i]; ++i) {
      inputElements[i].checked = true
    }
  }
  clearAll (e) {
    var inputElements = document.getElementsByClassName('selectcheckbox')
    for (var i = 0; inputElements[i]; ++i) {
      inputElements[i].checked = false
    }
  }
  rejectAll (e) {
    var inputElements = document.getElementsByClassName('selectcheckbox')
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        this.state.checkedValue.push(inputElements[i].getAttribute('data-id'))
      }
    }
    if (this.state.checkedValue.length > 0) {
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        let newState = Object.assign({}, this.state)
        newState.LeaveRecord.leaveRequest[index].status = 'Rejected'
        window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
      }
      this.setState({ open: true, status: 'Rejected' })
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        this.delete(index)
      }
      this.setState({ checkedValue: [] })
    } else {
      alert('Select record first')
    }
  }
  // *********************************************************
  approveAll (e) {
    var inputElements = document.getElementsByClassName('selectcheckbox')
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        this.state.checkedValue.push(inputElements[i].getAttribute('data-id'))
      }
    }

    if (this.state.checkedValue.length > 0) {
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        let newState = Object.assign({}, this.state)
        newState.LeaveRecord.leaveRequest[index].status = 'Approved'
        let id = this.state.LeaveRecord.leaveRequest[index].EmpId
        let type = this.state.LeaveRecord.leaveRequest[index].LeaveType
        let days = parseInt(this.state.LeaveRecord.leaveRequest[index].TotalDays)
        window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
        this.reduceLeaves(id, type, days)
      }
      this.setState({ open: true, status: 'Approved' })
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        this.delete(index)
      }
      this.setState({ checkedValue: [] })
    } else {
      alert('Select record first')
    }
  }

  render () {
    let data = JSON.parse(localStorage.getItem('Data'))
    if (data.leaveRequest) {
      return (
        // List of leave requests
        <div className='leaveRecord'>
          <div>
            <button className='RejectButton' onClick={e => this.selectAll(e)}>selectAll</button>
            <button className='ApproveButton' onClick={e => this.clearAll(e)}>rejectAll</button>
            <button className='RejectButton' onClick={e => this.rejectAll(e)}>Reject</button>
            <button className='ApproveButton' onClick={e => this.approveAll(e)}>Approve</button>
          </div>
          <table>
            <thead className='thead1'>
              <tr className='thead1'>
                <td className='tdStyle'>&nbsp;</td>
                <td className='tdStyle'>EmpID</td>
                <td className='tdStyle'>EmpName</td>
                <td className='tdStyle'>Applied On</td>
                <td className='tdStyle'>LeaveType</td>
                <td className='tdStyle'>From Date</td>
                <td className='tdStyle'>To Date</td>
                <td className='tdStyle'>Days</td>
                <td className='tdStyle'>Reason</td>
                <td className='tdStyle'>Action</td>
              </tr>
            </thead>
            <tbody>
              {data.leaveRequest.map((record, i) => {
                return record.status === 'Pending'
                // return this.state.deletedRow.indexOf(record.ReqestId) === -1
                  ? <tr key={i} className='tdStyle'>
                    <td className='tdStyle'><input type='checkbox'
                      data-id={i} className='selectcheckbox' defaultChecked={this.state.ischecked} /></td>
                    <td className='tdStyle'>{record.EmpId}</td>
                    <td className='tdStyle'>{record.EmpName}</td>
                    <td className='tdStyle'>{record.appliedOn.substr(0, 10)}</td>
                    <td className='tdStyle'>{record.LeaveType}</td>
                    <td className='tdStyle'>{record.FromDate.substr(0, 10)}</td>
                    <td className='tdStyle'>{record.ToDate.substr(0, 10)}</td>
                    <td className='tdStyle'>{record.TotalDays}</td>
                    <td className='tdStyle'>{record.LeaveReason}</td>
                    <td className='tdStyle'>
                      <button className='RejectButton' onClick={e => this.changeToReject(e, i)}>Reject</button><span>&nbsp;</span>
                      <button className='ApproveButton' onClick={e => this.changeToApprove(e, i)}>Approve</button>
                    </td>
                  </tr>
                  : ''
              })}
            </tbody>
          </table>
          <Popup open={this.state.open} closeOnDocumentClick modal>
            <div>
              <span>{this.state.status} successfully</span><br />
              <button className='button' onClick={e => this.closePopup(e)}>OK</button>
            </div>
          </Popup>
        </div>
      )
    } else {
      return (
        <div className='noRequset'>No requests</div>
      )
    }
  }
}

export default LeaveRequests
