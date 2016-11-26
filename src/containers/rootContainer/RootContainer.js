import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import '../../style/main.scss'
import style from './RootContainer.scss'
import RootReducer from '../../reducers/RootReducer'
import OpenChatScreen from '../../actions/routing/OpenChatScreen'
import ChatScreenContainer from '../chatScreenContainer/ChatScreenContainer'
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'

class Root extends Component {
    static propTypes = {
        isAdmin: React.PropTypes.bool,
        isMobile: React.PropTypes.bool
    }

    constructor(props) {
        super(props)

        this.state = {
            animation: true,
            currentScreen: null
        }

        this._currentHeight = 500
    }

    componentDidMount() {
        // if (!this.props.isMobile) {
        //     setInterval(() => {
        //         if (this._currentHeight == contentWrap.clientHeight)
        //             return
        //
        //         this._currentHeight = contentWrap.clientHeight
        //         this.props.onSizeChange(
        //             800,
        //             contentWrap.clientHeight
        //         )
        //     }, 200)
        // }
    }

    render() {
        let content

        if (this.props.currentScreen != this.state.currentScreen) {
            this.state.animation = true
            this.state.currentScreen = this.props.currentScreen
        }

        switch (this.props.currentScreen) {
            case OpenChatScreen.getName():
                content = (
                    <div>
                        <ChatScreenContainer/>
                    </div>
                )
                break
            default:
                content = <LoadingIndicator/>
        }

        if (this.state.animation == true) {
            setTimeout(() => {
                this.setState({
                    animation: false,
                    animationStop: true
                })
            }, 600)
        }

        return (
            <div>
                <div
                    id="contentWrap"
                    style={{minHeight: this.props.isMobile ? '0px' : '500px'}}
                >
                    {content}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentScreen: state.root.currentScreen
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //...RootActionSpawner.getSpawners(),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)