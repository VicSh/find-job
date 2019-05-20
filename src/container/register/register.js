import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';

import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  {
    register
  }
)
@imoocForm
class Register extends Component {
  constructor (props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleRegister() {
    this.props.register(this.props.state)
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  render () {
    const { RadioItem } = Radio;
    return (
      <Fragment>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null }
        <Logo />
        <WingBlank>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <List>
            <InputItem
              onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem 
              checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
            <RadioItem 
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}>BOSS</RadioItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleRegister} type="primary">注册</Button>
        </WingBlank>
      </Fragment>
    )
  }
}

export default Register