import React, {Component} from 'react'
import User from './../model/user/User'

class MapController {

    constructor(map) {
        this.map = map
    }

    setMarker = () => {
        // set marker condition for map (visible or not)
        // set database
        // set map
        this.map.setLocationButton()
        console.warn("Enter");
    }

    getUserID() {
        return User.getCurrentUserId();
    }

    getGroupID() {
        return User.getCurrentGroupId();
    }

}

export default MapController;


