import React, {Component} from 'react'
import FriendProfile from './../view/FriendProfileView'
import GroupMember from './../model/user/GroupMember'

class FriendProfileController extends Component {

    constructor(props) {

        super(props)

        this.friendID = this.props.navigation.getParam("friendID", "")
        // data contain name, phone num, email ,.......
        this.state = {data: ""}
    }

    componentDidMount() {
        GroupMember.getMemberInfo(this.friendID, this.setData)
    }

    setData = (data) => {
        this.setState({data: data})
    }

    render() {
        return(
            <FriendProfile
                data={this.state.data}/>
        )
    }
}

export default FriendProfileController;