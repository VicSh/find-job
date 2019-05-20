import React, { Component, Fragment } from 'react'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
const Item = List.Item
@connect(
  state => state,
  {
    getMsgList,
    sendMsg,
    recvMsg,
    readMsg
  }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  render () {
    const emoji = '😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀 😀'
                    .split(' ')
                    .filter(v=>v)
                    .map(v => ({text: v}))

    const userid = this.props.match.params.user
    const users = this.props.chat.users
    const chatId = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatId)
    if (!users[userid]) {
      return null
    }
    return (
      <div id="chat-page">
        <NavBar 
          mode="dark" 
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[userid].name}
        </NavBar>
        {chatmsg.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item 
                className="chat-me"
                extra={<img src={avatar} />}
              >{v.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="请输入" 
              value={this.state.text}
              onChange={(v) => {
                this.setState({
                  text: v
                })
              }}
              extra={
                <Fragment>
                  <span 
                    style={{marginRight: 15}} onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}>😀</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </Fragment>
              }>
            </InputItem>
          </List>
          {this.state.showEmoji ? <Grid 
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel
            onClick={_el => {
              this.setState({
                text: this.state.text + _el.text
              })
            }}
          /> : null}
          
        </div>
      </div>
    )
  }
}

export default Chat