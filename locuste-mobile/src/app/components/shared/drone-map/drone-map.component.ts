import { Component, OnInit, Input } from '@angular/core';
import { DroneCoordinates, SimplifiedDroneFlightCoordinates } from 'src/app/models/coordinates';
import { Subscription } from 'rxjs';
import { Boundaries } from 'src/app/models/map';
import { take } from 'rxjs/operators';
import { latLng, tileLayer, LatLngBounds, Map, marker, Layer, icon , Marker, LatLng} from 'leaflet';
import { MapService } from 'src/app/services/maps/map.service';
import { ControlSocketService } from 'src/app/services/sockets/control-socket.service';
import { AutoPilotDataService } from 'src/app/services/autopilot/auto-pilot-data.service';

@Component({
  selector: 'app-drone-map',
  templateUrl: './drone-map.component.html',
  styleUrls: ['./drone-map.component.scss']
})
export class DroneMapComponent implements OnInit {

  @Input() public width: number
  @Input() public height: number
  @Input() public drone: string
 
  public options: any;
  private myMap: Map;
  private dronePosMarker: Marker<any>;
  
  private onUpdate: Subscription;
  private _lastCoordinates : DroneCoordinates;
  private _targetCoordinates: SimplifiedDroneFlightCoordinates

  private NextOrder : Marker<any>
  private CurrentOrder : Marker<any>
  private PreviousOrder : Marker<any>
  private onTarget: Subscription;
  private onAutopilot: Subscription;
  
  private myBoundaries: Boundaries

  private _myPhone: Marker<any>;
  private _autoPilotTarget: Marker<any>


  constructor(private mapService: MapService, private autoPilotService: AutoPilotDataService, private updater: ControlSocketService) { 
    this.onUpdate = this.updater.positionUpdate$.subscribe((position: DroneCoordinates) => {
      if(position != null && this.myMap != null && position.id === this.drone){
        this._lastCoordinates = position;

        this.dronePosMarker.setLatLng(latLng(this._lastCoordinates.latitude,  this._lastCoordinates.longitude))
        this.myMap.setZoomAround(this.dronePosMarker.getLatLng(), 19)
      }
    });

    this.mapService.getMapBoundaries().pipe(take(1)).subscribe(result => {
      this.myBoundaries = result;
      if(this.myMap != null && result != null){
        this.defineBoundaries()
      }
    })

    this.onAutopilot = this.autoPilotService.autopilotUpdate$.subscribe(update => {
      if(update != null){
        if (update.drone_name === this.drone){
          if(this.CurrentOrder == null ){
            if(this._targetCoordinates != null && this._targetCoordinates.latitude == update.coordinates.latitude && this._targetCoordinates.longitude == update.coordinates.longitude){
              this.removeMark("CurrentOrder")
            } else {
              this.addMark("CurrentOrder", update.coordinates, "Destination actuelle")
            }
          } else {
            this.setMark("CurrentOrder", update.coordinates)
          }

          if(this.PreviousOrder == null ){
            this.addMark("PreviousOrder", update.metadata.previous, "Destination précédente",1)
          } else {
            this.setMark("PreviousOrder", update.metadata.previous)
          }

          if(this.NextOrder == null ){
            this.addMark("NextOrder", update.metadata.next, "Prochaine destination",0.5)
          } else {
            if(update.metadata.next.latitude=== update.coordinates.latitude && update.metadata.next.longitude === update.coordinates.longitude && update.metadata.next.altitude === update.coordinates.altitude){
              this.removeMark("NextOrder")
            } else {
              this.setMark("NextOrder", update.metadata.next)
            }
          }
        }
      }
    })


    this.onTarget = this.autoPilotService.targetUpdate$.subscribe(update => {
      if(update != null){
        if (update.name === this.drone){
          this._targetCoordinates = update;
          if(this._autoPilotTarget == null ){
            this.addMarkFromLatLng("_autoPilotTarget", latLng(update.latitude, update.longitude), "Emplacement du déplacement voulu")
          } else {
            this.setMarkFromLatLng("_autoPilotTarget", latLng(update.latitude, update.longitude))
          }
        } 
      }
    })
    

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 14,  })
      ],
      zoom: 14
    }; 
  }

  ngOnDestroy(): void {
    this.onUpdate.unsubscribe();
    this.onTarget.unsubscribe();
    this.onAutopilot.unsubscribe();
  }


  onMapReady(map: Map) {
    this.myMap = map;
   
    if(this.myBoundaries != null){
      this.defineBoundaries()
    }

    this._lastCoordinates = new DroneCoordinates();
    this._lastCoordinates.latitude = 500;
    this._lastCoordinates.longitude = 500;
    this.dronePosMarker = new Marker(latLng(this._lastCoordinates.latitude ,this._lastCoordinates.longitude ), {
      icon: icon({
        iconSize: [40, 40],
        iconAnchor: [20, 20],      
        iconUrl: 'assets/images/drone_marker.png',
        iconRetinaUrl: 'assets/images/drone_marker.png'
      })
    });
    this.dronePosMarker.addTo(this.myMap)

    
    if(this.CurrentOrder != null) {
      this.CurrentOrder.addTo(this.myMap)
    }

    if(this.PreviousOrder != null) {
      this.PreviousOrder.addTo(this.myMap)
    }

    if(this.NextOrder != null) {
      this.NextOrder.addTo(this.myMap)
    }
    

    this.myMap.on('locationfound', this.onLocationFound);
    this.myMap.locate({setView: false, watch: true});
  }

  onLocationFound(e) {
    this.addMarkFromLatLng("_myPhone", e.latlng, "Moi")

  }

  private defineBoundaries(){
    let bound = new LatLngBounds(latLng(this.myBoundaries.min_lat, this.myBoundaries.min_lon), latLng(this.myBoundaries.max_lat, this.myBoundaries.max_lon));
    this.myMap.setMaxBounds(bound)
    this.myMap.fitBounds(bound)
  }
  
  ngOnInit(): void {
    
  }

  private addMark(markName: string, coordinates: DroneCoordinates, description: string, opacity: number = 1){
    this.addMarkFromLatLng(markName, latLng(coordinates.latitude, coordinates.longitude), description, opacity)
  }

  private addMarkFromLatLng(markName: string, coordinates: LatLng, description: string, opacity: number = 1){
    let iconUrl = "assets/images/marker-icon.png"
    let hwArray = [20,36]
    let anchorArray = [10,36]
    if(markName.includes("Current")){
      iconUrl = "assets/images/next_position_marker.png"
      hwArray = [40,40]
      anchorArray = [20,20]
    }

    if(markName.includes("Next")){
      iconUrl = "assets/images/plan_next_position_marker.png"
      hwArray = [30,30]
      anchorArray = [15,15]
    }

    if(markName.includes("Previous")){
      iconUrl = "assets/images/previous_position_marker.png"
      hwArray = [20,20]
      anchorArray = [10,10]
    }

    if(markName.includes("_autoPilotTarget")){
      iconUrl = "assets/images/target_marker.png"
      hwArray = [40,40]
      anchorArray = [20,20]
    }

    if(markName.includes("_myPhone")){
      iconUrl = "assets/images/user_marker.png"
      hwArray = [40,40]
      anchorArray = [20,20]
    }

    this[markName] = new Marker(coordinates, {
      opacity:opacity,
      icon: icon({
        iconSize: [hwArray[0],hwArray[1]],
        iconAnchor: [anchorArray[0],anchorArray[1]],
        iconUrl: iconUrl,
        iconRetinaUrl: iconUrl
      })
    });

    (this[markName] as Marker<any>).bindTooltip(description)

    if(this.myMap != null) {
      this[markName].addTo(this.myMap)
    }

  }

  private setMark(markName: string, coordinates :DroneCoordinates){
    this.setMarkFromLatLng(markName,latLng(coordinates.latitude, coordinates.longitude))
  }

  private removeMark(markName: string){
    if(this.myMap != null) {
        this[markName].removeFrom(this.myMap)
    }
    this[markName] = null;
  }


  private setMarkFromLatLng(markName: string, coordinates: LatLng){
    if(this[markName] != null){
      this[markName].setLatLng(coordinates)
    }
  }
}
