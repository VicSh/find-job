import React, { Component, Fragment } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import {Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  {
    update
  }
)
class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    }
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    });
  }
  render () {
    return (
      <Fragment>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector selectAvatar={avatar => {
          this.setState({
            avatar
          })
        }}></AvatarSelector>
        <InputItem onChange={v => this.handleChange('title', v)}>求职岗位</InputItem>
        <TextareaItem
          autoHeight
          rows={3}
          title='个人简介'
          onChange={v => this.handleChange('desc', v)}></TextareaItem>
        <Button 
          onClick={() => {
            this.props.update(this.state)
          }}
          type="primary">保存</Button>
      </Fragment>
    )
  }
}

export default GeniusInfo;