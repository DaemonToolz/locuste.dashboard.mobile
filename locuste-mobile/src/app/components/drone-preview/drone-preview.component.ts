import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { ViewsEnum } from 'src/app/models/views';
import { BatteryStatus, GPSStatus, GPSStrength, WifiStatus, WifiStrength } from 'src/app/models/drone';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DroneDataService } from 'src/app/services/drones/drone-data.service';
import { OperatorService } from 'src/app/services/users/operator.service';
import { HealthMonitoringService } from 'src/app/services/health/health-monitoring.service';
import { AutoPilotDataService } from 'src/app/services/autopilot/auto-pilot-data.service';
import { AutomatedCommandRequest } from 'src/app/models/commands';
import { take } from 'rxjs/operators';
import { CommandRequesterService } from 'src/app/services/drones/command-requester.service';

@Component({
  selector: 'app-drone-preview',
  templateUrl: './drone-preview.component.html',
  styleUrls: ['./drone-preview.component.scss']
})
export class DronePreviewComponent implements OnInit {
  public BatteryStatus = BatteryStatus;
  public GPSStatus = GPSStatus;
  public GPSStrength = GPSStrength;
  public WifiStatus = WifiStatus;
  public WifiStrength = WifiStrength;
  public ViewsEnum = ViewsEnum;


  
  private _width : number;
  private _height: number;
  
  private _views : Map<string, ViewsEnum> = new Map<string, ViewsEnum>()
  
  public get width(){return this._width}
  public get height(){return this._height}

  public get availableDrones() : string[] {
    return this.droneData.availableDrones
  }


  public constructor(private requesterService : CommandRequesterService, private autoPilotService: AutoPilotDataService, private droneData :DroneDataService,  private operatorService: OperatorService, private droneStatusController: HealthMonitoringService)  { 
    this.calculateDim();
  } 

  ngOnInit(): void {
  }

  private calculateDim(){
    if(window.outerWidth > window.outerHeight){
      this._width = window.outerHeight / 1.15;
      //this._height = window.outerHeight/1.5;
    } else {
      this._width = window.outerWidth/1.10;
      //this._height = window.outerHeight/1.5;
    }
    this._height = this._width * (9/16);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.calculateDim();
  }


  public changeView(drone: string, view: ViewsEnum){
    this._views.set(drone, view)
  }

  public isOnView(drone: string, view: ViewsEnum){
    if(!this._views.has(drone)) {
      this.changeView(drone, ViewsEnum.DroneCameraView)
    }
    return this._views.has(drone) ? this._views.get(drone) === view : false   
  }

  public droneBattery(drone: string){
    return (this.droneData.droneBattery(drone))
  }

  public getBatteryStatus(drone: string){
    return (this.droneData.batteryStatus(drone))
  }

  public getDroneLeader(name: string){
    return this.operatorService.getLeader(name);
  }

  public getAutopilotStatus(droneName: string){
    return this.autoPilotService.AutoPilot(droneName)
  }

  public getFlyingStatus(droneName: string){
    return this.droneData.droneFlyingStatuses(droneName)
  }

  public isAutopilotOperational(droneName: string):boolean{
    let autopilot = this.autoPilotService.AutoPilot(droneName)
    return autopilot.is_running &&   autopilot.is_active
  }

  public isAutopilotInactive(droneName: string):boolean{
    let autopilot = this.autoPilotService.AutoPilot(droneName)
    return autopilot.is_running &&  !autopilot.is_active
  }

  public isAutopilotOffline(droneName: string):boolean{
    let autopilot = this.autoPilotService.AutoPilot(droneName)
    return !autopilot.is_running
  }

  public getGPSStatus(droneName: string) :GPSStatus{
    let coordinates = this.droneData.droneCoordinates(droneName)
    if(coordinates == null) { return GPSStatus.not_registered } 
    if((coordinates.latitude === coordinates.longitude && coordinates.longitude === 500)) return GPSStatus.unavailable
    return GPSStatus.ready
  }

  public getGPSStrength(droneName: string) : GPSStrength{
    return this.droneData.gpsStrength(droneName)
  }


  public getWifiStatus(droneName: string) :WifiStatus{
    let coordinates = this.droneData.droneWifi(droneName)
    if(coordinates == -500) { return WifiStatus.unavailable } 
    return WifiStatus.ready
  }

  public getWifiStrength(droneName: string) : WifiStrength{
    return this.droneData.wifiStrength(droneName)
  }

  public takeoffLand(droneName: string) {
    let target = this.droneData.droneFlyingStatuses(droneName);

    if(target != null && !target.is_going_home){

      if(target.is_landed){
        this.requesterService.sendAutomatedCommand(droneName, AutomatedCommandRequest.TakeOff).pipe(take(1)).subscribe()
      } else if(target.is_home_ready){
        this.requesterService.sendAutomatedCommand(droneName, AutomatedCommandRequest.GoHome).pipe(take(1)).subscribe()
      }
    }
  }

}
