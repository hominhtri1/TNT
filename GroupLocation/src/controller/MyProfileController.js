import React, {Component} from 'react'
import MyProfile from './../view/MyProfileView'
import User from '../model/user/User'

class MyProfileController extends Component {

    constructor(props) {

        super(props)
        this.state = {name: ""}
    }

    componentDidMount() {
        User.setProfile(this.setUserProfile);
    }


    setUserProfile = (name) => {
        this.setState({name: name})
    }

    render() {
        return(
            <MyProfile
                name={this.state.name} />
        )
    }


}

export default MyProfileController;