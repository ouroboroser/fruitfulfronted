import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom'
import instance from '../../services/tokenprovider';

export class FriendProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            user:{}
        }
    }

    componentDidMount() {
        const userNick = (this.props.match.params.nick);
        console.log(userNick)
        instance.get('user/' + userNick)
        .then(result => {
            this.setState({user:result.data})
            console.log(result.data.id)
            console.log(typeof result)
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.user !== this.state.user) {
            const userNick = (this.props.match.params.nick);
            console.log(userNick)
            instance.get('user/' + userNick)
            .then(result => {
                this.setState({user:result.data})
                console.log(result.data.id)
                console.log(typeof result)
            })
        }
      }

    addFriend(UserId){
        const {user} = this.state;
        const formData = new FormData();
        formData.append('UserId', UserId);
        const options = {
            body:formData
        }
        console.log(UserId)
        instance.post('/addfriend/' + UserId, options)
        .then(responce => {
            console.log(responce);
        }
        )
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const {user} = this.state;
        return (
        <Fragment>
            <div className='container'>
                <div className='row justify-content-md-center' id='mainInfo'>
                    <p></p>
                    <div className='col-xs-12 col-lg-3 ' id='profilePicture'>
                        <div id='avatar'>
                            {/* <input type ="file" /> */}
                        </div>
                    </div>
                    <div className='col-xs-12 col-lg-3 ' id='profileDescription' >
                        <p id='userName'> {user.name}</p>
                        <span className='userNick'>@</span><span className='userNick'> {user.nick} </span>
                        <button onClick = {() => this.addFriend(user.id)} className = 'addFriend'> add </button>
                    </div>
                </div>
            </div>
        </Fragment>
        )
    }
}

export default withRouter(FriendProfile);