import React,{Component} from 'react'
import MapContainerController from './MapContainerController'
import MapController from './MapController2'
import FriendListController from './FriendListController'

class TotalMapController extends Component {

    render() {
        return(
            <MapContainerController>
                <MapController>
                    <FriendListController />
                </MapController>
            </MapContainerController>
        )
    }
}

export default TotalMapController;