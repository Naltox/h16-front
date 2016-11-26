import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import style from './ChatScreenContainer.scss'
import ChatScreenActionsSpawner from '../../action-spawners/ChatScreenActionsSpawner'

class ChatScreenContainer extends Component {
    constructor(props) {
        super(props)

        this._willScroll = true

        this._list = null

        this.state = {
            text: ''
        }
    }

    componentDidUpdate() {
        if (this._willScroll)
            this._list.scrollTop = this._list.scrollHeight
    }

    render() {
        const messages = this.props.messages || []
        const {text} = this.state

        if (!this._list)
            this._list = document.getElementById('messages')

        if (this._list) {
            this._willScroll = (this._list.scrollHeight - this._list.scrollTop <= 500)
        }

        return (
            <div className={style.ChatScreenContainer}>
                <div
                    style={{
                        height: '500px',
                        overflow: 'scroll'
                    }}
                    id="messages"
                >
                    {messages.map((m, i) => this._renderMessage(m, i))}
                </div>

                <div className={style.BottomWrap}>
                    <input
                        placeholder="Напишите сообщение..."
                        className={style.Input}
                        type="text"
                        value={text}
                        onKeyPress={e => this._handleKeyPress(e)}
                        onChange={(e) => this._textChange(e.target.value)}
                    />

                    <input
                        className={style.SendButton}
                        onClick={() => this._sendMessage()}
                        type="button"
                    />
                </div>
            </div>
        )
    }

    /**
     * @param {Message} message
     * @param {number} key
     * @private
     */
    _renderMessage(message, key) {
        return (
            <div key={key} className={style.Message}>
                <img
                    src={message.userPic}
                    className={style.Ava}
                />
                <div className={style.LeftBox}>
                    <div className={style.Username}>
                        {message.userName}
                    </div>
                    <div className={style.Text}>
                        {message.text}
                    </div>
                </div>
            </div>
        )
    }

    _textChange(newText) {
        this.setState({ text: newText })
    }

    _sendMessage() {
        if (this.state.text == '')
            return

        this.props.sendMessage(this.state.text)
        this.setState({text: ''})
    }

    _handleKeyPress(e) {
        if (this.state.text == '')
            return

        if (e.key === 'Enter') {
            this.props.sendMessage(this.state.text)
            this.setState({text: ''})
        }
    }
}

function mapStateToProps(state) {
    return {
        messages: state.chat.messages
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...ChatScreenActionsSpawner.getSpawners(),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreenContainer)