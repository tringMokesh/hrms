import React, { Component } from 'react'
import './EditProfileApproval.css'
import { NavLink } from 'react-router-dom'

class EditProfileApproval extends Component {
  constructor (props) {
    super(props)
    this.state = {
      EmpId: '',
      EmpName: '',
      ContactNum: '',
      Address: '',
      EditProfile: JSON.parse(localStorage.getItem('Data'))
    }
  }

  /* --------Rejects the changes to be updated in User Profile -------- */

  changeToReject (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.EditProfile.edittedProfile[index].status = 'Rejected'
    window.localStorage.setItem('Data', JSON.stringify(this.state.EditProfile))
    this.setState({ open: true })
    this.setState({ status: 'Rejected' })
  }

  /* -------Approves the changes to be updated in User Profile -------- */

  changeToApprove (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.EditProfile.edittedProfile[index].status = 'Approved'
    window.localStorage.setItem('Data', JSON.stringify(this.state.EditProfile))
    this.setState({ open: true })
    this.setState({ status: 'Approved' })
    var empId = this.state.EditProfile.edittedProfile[index].EmpId
    var newAddress = this.state.EditProfile.edittedProfile[index].Address
    var newContact = this.state.EditProfile.edittedProfile[index].ContactNum
    this.updateData(empId, newAddress, newContact)
  }

  /* --------Updates the changes to be updated in User Profile -------- */

  updateData (empId, newAddress, newContact) {
    let newState = Object.assign({}, this.state)
    var data = this.state.EditProfile.Employee
    var newEmpId = empId

    for (var i = 0; i < data.length; ++i) {
      var id = data[i].EmpId
      if (id === newEmpId) {
        alert(typeof id + '  id')
        alert(typeof newEmpId + ' new emp')
        alert('in loop')
        newState.EditProfile.Employee[i].ContactNum = newContact
        newState.EditProfile.Employee[i].Address = newAddress

        window.localStorage.setItem(
          'Data',
          JSON.stringify(this.state.EditProfile)
        )
        this.state.EditProfile.edittedProfile.splice(i, 1)
      }
    }
  }

  render () {
    let empId = JSON.parse(localStorage.getItem('currentUserId'))
    var data1 = JSON.parse(window.localStorage.getItem('Data'))
    // data1 = data1.edittedProfile
    if (data1.edittedProfile) {
      return (
        <div className='editProfileApproval'>
          <div className='editProfile'>
            <table>
              <thead className='thead1'>
                <tr className='thead1'>
                  <td className='tdStyle'>Employee Id</td>
                  <td className='tdStyle'>Employee Name</td>
                  <td className='tdStyle'>Address</td>
                  <td className='tdStyle'>Contact Number</td>
                  <td className='tdStyle'>Option</td>
                </tr>
              </thead>
              <tbody>
                {this.state.EditProfile.edittedProfile.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td className='tdStyle'>{data.EmpId}</td>
                      <td className='tdStyle'>{data.EmpName}</td>
                      <td className='tdStyle'>{data.Address}</td>
                      <td className='tdStyle'>{data.ContactNum}</td>
                      <td className='tdStyle'>
                        <button
                          className='rejectButtonProfile'
                          onClick={e => this.changeToReject(e, i)}
                        >
                          Reject
                        </button>
                        <span>&nbsp</span>
                        <button
                          className='approveButtonProfile'
                          onClick={e => this.changeToApprove(e, i)}
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <br />
            <div className='backButton'>
              <NavLink to='/profile'>
                <button>Back</button>
              </NavLink>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='approveProfileHeader'>No details</div>
        </div>
      )
    }
  }
}
export default EditProfileApproval
