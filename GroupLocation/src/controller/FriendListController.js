import React,{Component} from 'react'
import GroupMember from '../model/user/GroupMember'
import FriendList from './../view/mapView/FriendListView'

class FriendListController extends Component {

    constructor(props) {
        super(props)
        this.state = {friendList: []}
    }

    componentDidMount() {

        GroupMember.getGroupMembers(this.setFriendList);
    }

    setFriendList = (data) => {
        this.setState({friendList: data})
    }

    gotoFriendProfile = (id) => {
        this.props.navigation.navigate('FriendProfile', {friendID: id});
    }

    setHightlight = (id) => {
        GroupMember.setHightlight(id);
    }

    render() {
        return(
            <FriendList 
                friendList={this.state.friendList}
                gotoFriendProfile={this.gotoFriendProfile}
                setHightlight={this.setHightlight}
                />
        )
    }

}

export default FriendListController;