import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DroneNotification, DroneInternalStatusNotification } from 'src/app/models/notification';
import { InternalStatuses, BatteryStatus, GPSStrength, WifiStrength } from 'src/app/models/drone';
import { DroneCoordinates } from 'src/app/models/coordinates';
import { DroneDiscoveryService } from '../discovery/drone-discovery.service';
import { HealthMonitoringService } from '../health/health-monitoring.service';
import { retry, take } from 'rxjs/operators';
import { ControlSocketService } from '../sockets/control-socket.service';
import { DroneSummarizedStatus } from 'src/app/models/autopilot';
import { AutoPilotDataService } from '../autopilot/auto-pilot-data.service';
import { DroneFlyingStatusesService } from './drone-flying-statuses.service';

@Injectable({
  providedIn: 'root'
})
export class DroneDataService {
  private _availableDrones: string[] = [];
  private _subscriptionPool: Subscription[] = [];

  private _droneStatuses: DroneNotification[] = [];
  private _droneInternalStatuses: Map<string, Map<InternalStatuses, any>> = new Map<string, Map<InternalStatuses, any>>();
  private _droneCoordinates: Map<string, DroneCoordinates> = new Map<string, DroneCoordinates>();
  private _droneFlyingStatus: Map<string, DroneSummarizedStatus> = new Map<string, DroneSummarizedStatus>();
  
  public get availableDrones(): string[] {
    return this._availableDrones
  }

  public get droneStatuses(): DroneNotification[] {
    return this._droneStatuses
  }


  public droneInternalStatus(name: string): Map<string, any> {
    if (!this._droneInternalStatuses.has(name)) return null
    return this._droneInternalStatuses.get(name)
  }

  public batteryStatus(name: string): BatteryStatus {
    if (this.droneBattery(name) > 75) return BatteryStatus.high
    if (this.droneBattery(name) > 50) return BatteryStatus.medium
    if (this.droneBattery(name) > 25) return BatteryStatus.low
    return BatteryStatus.critical;
  }


  public gpsStrength(name: string): GPSStrength {
    if (this.droneGPS(name) > 18) return GPSStrength.high
    if (this.droneGPS(name) > 10) return GPSStrength.medium
    return GPSStrength.low
  }


  public wifiStrength(name: string): WifiStrength {
    if (this.droneWifi(name) <= -30 && this.droneWifi(name) > -45) return WifiStrength.high
    if (this.droneWifi(name) <= -45 && this.droneWifi(name) > -80) return WifiStrength.medium
    return WifiStrength.low
  }

  public droneBattery(name: string): number {
    if (this.droneInternalStatus(name) != null && this.droneInternalStatus(name).has(InternalStatuses.BatteryStateChanged)) {
      return this._droneInternalStatuses.get(name).get(InternalStatuses.BatteryStateChanged) as number;
    }
    return 100
  }

  public droneGPS(name: string): number {
    if (this.droneInternalStatus(name) != null && this.droneInternalStatus(name).has(InternalStatuses.numberOfSatelliteChanged)) {
      return this._droneInternalStatuses.get(name).get(InternalStatuses.numberOfSatelliteChanged) as number;
    }
    return 0
  }

  public droneWifi(name: string): number {
    if (this.droneInternalStatus(name) != null && this.droneInternalStatus(name).has(InternalStatuses.rssi_changed)) {
      return this._droneInternalStatuses.get(name).get(InternalStatuses.rssi_changed) as number;
    }
    return -500 // https://developer.parrot.com/docs/olympe/arsdkng_wifi.html?highlight=rssi#olympe.messages.wifi.rssi_changed
  }


  constructor(private _droneFlyingStatusesService: DroneFlyingStatusesService, private droneAutopilotService: AutoPilotDataService, private droneDiscovery: DroneDiscoveryService, private connector: ControlSocketService, droneMonitorService: HealthMonitoringService) {
    this.droneDiscovery.getDroneInfo().pipe(retry(20), take(1)).subscribe(data => {
      this._availableDrones = data;
      data.forEach(name => {
        droneMonitorService.forceUpdate(name)
        this.droneAutopilotService.refreshAutopilot(name)
      })

      this._subscriptionPool.push(this.connector.positionUpdate$.subscribe((position: DroneCoordinates) => {
        if (position != null) {
          this._droneCoordinates.set(position.id, position);
        }
      }));

    })

    this._subscriptionPool.push(this.connector.internalStatusUpdate$.subscribe((notification: DroneInternalStatusNotification) => {
      if(notification != null){
        if (!this._droneInternalStatuses.has(notification.id)) {
          this._droneInternalStatuses.set(notification.id, new Map<InternalStatuses, any>())
        }
        this._droneInternalStatuses.get(notification.id).set(InternalStatuses[notification.status], notification.result);
      }
    }))


    this._subscriptionPool.push(this.connector.flyingStatusUpdate$.subscribe((notification: DroneSummarizedStatus) => {
      if(notification != null){
        this._droneFlyingStatus.set(notification.drone_name, notification);
      }
    }))

    this._subscriptionPool.push(this.connector.droneEvents$.subscribe((notification: DroneNotification) => {

      if (notification != null) {
        if (notification.name != null) {
          let index = this._availableDrones.findIndex(data => data == notification.name)
          if (index == -1) {
            this._availableDrones.push(notification.name)
          }

          index = this._droneStatuses.findIndex(data => data.name == notification.name)
          if (index == -1) {
            this._droneStatuses.push(notification)
          } else {
            this._droneStatuses[index] = notification;
          }

        } else {
          this._droneStatuses.splice(0);
          this._availableDrones.forEach(drone => {
            let droneNotification = { ...notification }
            droneNotification.name = drone
            this._droneStatuses.push(droneNotification);
          })
        }
      }
    }))

    this._droneFlyingStatusesService.fetchAllFlyingStatuses().pipe(take(1)).subscribe((result : Map<string,DroneSummarizedStatus>)  => {
      result = new Map(Object.entries(result)) // Bug, l'objet envoyé n'est pas casté en map par défaut
      if(result != null && result.size > 0){
        result.forEach(value => {
          this._droneFlyingStatus.set(value.drone_name,value);
          
        })
      }
    })


  }


  public droneFlyingStatuses(name: string): DroneSummarizedStatus {
    if (!this._droneFlyingStatus.has(name)) {
      return null
    }
    return this._droneFlyingStatus.get(name)
  }

  public droneCoordinates(name: string): DroneCoordinates {
    if (!this._droneCoordinates.has(name)) {
      return null
    }
    return this._droneCoordinates.get(name)
  }



}
