import React, {Component}  from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
@connect(
  state => state
)
class Msg extends Component {
  getList(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getList(a).create_time
      const b_last = this.getList(b).create_time
      return b_last - a_last
    })

    return (
      <List>
        {chatList.map(v => {
          const listItem = this.getList(v)
          const targetId = listItem.from === userid ? listItem.to : listItem.from
          const unreadNum = v.filter(v => !v.read && v.to === userid).length
          return (
            <Item
              key={listItem._id}
              extra={<Badge text={unreadNum}/>}
              thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(`/chat/${targetId}`)
              }}
            >
              {listItem.content}
              <Brief>{userinfo[targetId].name}</Brief>
            </Item>
          )
        })}
      </List>
    )
  }
}
export default Msg