

class MapController {

    constructor(map) {
        this.map = map
        console.warn(map)
    }

    setMarker = () => {
        // set marker condition for map (visible or not)
        // set database
        // set map
        this.map.setLocationButton()
        console.warn("Enter");
    }

}

export default MapController;


