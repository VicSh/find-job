import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

// function WrapperHello (Comp) {
//   // 反向继承
//   class WrapCom extends Comp{
//     componentDidMount() {
//       console.log('反向继承')
//     }
//     render () {
//       return (
//         <Fragment>
//           <div>react hasdfsdfsdfha</div>
//           <Comp {...this.props}></Comp>
//         </Fragment>
//       )
//     }
//   }
  // 属性代理
  // class WrapCom extends Component{
  //   render () {
  //     return (
  //       <Fragment>
  //         <div>react hasdfsdfsdfha</div>
  //         <Comp name="haha" {...this.props}></Comp>
  //       </Fragment>
  //     )
  //   }
  // }
//   return WrapCom
// }

// @WrapperHello
// class Hello extends Component {
//   componentDidMount() {
//     console.log('原组件')
//   }
//   render() {
//     return (
//       <h1>hello</h1>
//     )
//   }
// }

@connect(
  state => state.user,
  {
    login
  }
)
@imoocForm
class Login extends Component {
  constructor (props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  register() {
    this.props.history.push('/register');
  }
  handleLogin () {
    this.props.login(this.props.state);
  }
  render () {
    return (
      <Fragment>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null }
        <Logo />
        <WingBlank>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <List>
            <InputItem
              onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </Fragment>
    )
  }
}

export default Login