import React, { Component } from 'react'
import UserCard from '../usercard/usercard'
import { getUserList } from '../../redux/chatuser.redux'

import { connect } from 'react-redux'

@connect(
  state => state.chatuser,
  {
    getUserList
  }
)
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render () {
    return <UserCard userlist={this.props.userlist}/>
  }
}
export default Boss