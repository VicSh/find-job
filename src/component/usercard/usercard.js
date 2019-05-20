import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'

const { Header, Body } = Card

@withRouter
class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }
  render () {
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
          v.avatar ? 
          <Fragment key={v._id}>
            <WhiteSpace />
            <Card
              onClick={() => this.handleClick(v)}>
              <Header 
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Body>
                {v.type === 'boss' ? <div>公司：{v.company}</div> : null }
                {v.desc.split('\n').map(v => (
                  <div key={v}>{v}</div>
                ))}
                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null }
              </Body>
            </Card>
          </Fragment> : null
        ))}
      </WingBlank>
    )
  }
}

export default UserCard