import {Marker, latLng} from "leaflet"

export class DroneCoordinates {
    id: string;
    longitude: number;
    latitude : number;
    altitude: number;
}



export class DroneMarker {
    marker : Marker<any>
    coordinates: DroneCoordinates;

    public set Coordinates(myCoordinates: DroneCoordinates){
        this.coordinates = myCoordinates 
        if(this.marker != null){
            this.marker.setLatLng(latLng(this.coordinates.latitude, this.coordinates.longitude))
        }
    }

}


export class DroneFlightCoordinates {
    drone_name: string;
    coordinates: DroneCoordinates;
    metadata : MarkerMetaData;
}


export class SimplifiedDroneFlightCoordinates {
    name: string;
    longitude: number;
    latitude : number;
}


export class MarkerMetaData {
    street_name: string;
    distance: number;
    altitude : number;
    next : DroneCoordinates;
    previous : DroneCoordinates;
}