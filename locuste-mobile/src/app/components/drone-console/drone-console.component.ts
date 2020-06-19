import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatteryStatus, GPSStatus, GPSStrength, WifiStatus, WifiStrength } from 'src/app/models/drone';
import { DroneSettingsService } from 'src/app/services/drones/drone-settings.service';
import { OperatorService } from 'src/app/services/users/operator.service';
import { DroneDataService } from 'src/app/services/drones/drone-data.service';
import { HealthMonitoringService } from 'src/app/services/health/health-monitoring.service';
import { MatDialog } from '@angular/material/dialog';
import { ControlSocketService } from 'src/app/services/sockets/control-socket.service';
import { CommandRequesterService } from 'src/app/services/drones/command-requester.service';
import { AutoPilotDataService } from 'src/app/services/autopilot/auto-pilot-data.service';
declare var require: any;
const nipplejs = require('nipplejs');

@Component({
  selector: 'app-drone-console',
  templateUrl: './drone-console.component.html',
  styleUrls: ['./drone-console.component.scss']
})
export class DroneConsoleComponent implements OnInit, AfterViewInit {
  public BatteryStatus = BatteryStatus;
  public GPSStatus = GPSStatus;
  public GPSStrength = GPSStrength;
  public WifiStatus = WifiStatus;
  public WifiStrength = WifiStrength;

  private leftManager: any;
  private rightManager: any;

  private leftOngoing: boolean;
  private rightOngoing: boolean;
  

  @ViewChild("left") public left: ElementRef;
  @ViewChild("right") public right: ElementRef;

  ngAfterViewInit() {
   
  }

  private _width: number;
  private _height: number;
  public joystickVisible = false;
  public selectedDrone: string;

  public get width() { return this._width }
  public get height() { return this._height }

  constructor(private route: ActivatedRoute, private droneSettingsService: DroneSettingsService, 
    private operatorService: OperatorService, private droneData :DroneDataService, private connector: ControlSocketService, private requester :CommandRequesterService, private droneStatusController: HealthMonitoringService, private dialog: MatDialog, private autoPilotService: AutoPilotDataService) {
    this.selectedDrone = this.route.snapshot.paramMap.get('droneid');

    this.calculateDim();
  }

  public toogleJoystick(){
    this.joystickVisible = !this.joystickVisible;

    if(this.joystickVisible){
      var leftOptions = {
        zone: this.left.nativeElement,
        mode: "static",
        position: { bottom: "25%", left: "50%" }
      };
      this.leftManager = nipplejs.create(leftOptions);
      this.initJoystick("left")
      var rightOptions = {
        zone: this.right.nativeElement,
        mode: "static",
        position: { bottom: "25%", right: "50%" }
      };
      this.rightManager = nipplejs.create(rightOptions);
      this.initJoystick("right")

    } else {
      if(this.leftManager != null){
        this.leftManager.destroy();
      }
      if(this.rightManager != null){
        this.rightManager.destroy();
      }
    }
  }

  private initJoystick(manager: string){
    const self = this;
    this[`${manager}Manager`].on('start move end', function (evt, data) {
      if(evt.type === "start"){
        this[`${manager}Ongoing`] = true
      }

      if(evt.type === "end"){
        this[`${manager}Ongoing`] = false
      }

      if(evt.type === "move"){
        //console.log(data);
        // leftevent + rightevent 
      }
    });
  
  }

  private calculateDim() {
    if (window.outerWidth > window.outerHeight) {
      this._width = window.outerHeight / 1.15;
      //this._height = window.outerHeight/1.5;
    } else {
      this._width = window.outerWidth / 1.10;
      //this._height = window.outerHeight/1.5;
    }
    this._height = this._width * (9 / 16);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateDim();
  }

  ngOnInit(): void {
  }

  public get isManual(){
    return this.droneStatusController.isManualUnit(this.selectedDrone);
  } 

  public get isTested(){
    return this.droneStatusController.isTested(this.selectedDrone);
  } 

  public get droneBattery(){
    return (this.droneData.droneBattery(this.selectedDrone))
  }

  public get getBatteryStatus(){
    return (this.droneData.batteryStatus(this.selectedDrone))
  }

  public get getDroneLeader(){
    return this.operatorService.getLeader(this.selectedDrone);
  }

  public get getAutopilotStatus(){
    return this.autoPilotService.AutoPilot(this.selectedDrone)
  }

  public get isAutopilotOperational():boolean{
    let autopilot = this.autoPilotService.AutoPilot(this.selectedDrone)
    return autopilot.is_running &&   autopilot.is_active
  }

  public get isAutopilotInactive():boolean{
    let autopilot = this.autoPilotService.AutoPilot(this.selectedDrone)
    return autopilot.is_running &&  !autopilot.is_active
  }

  public get isAutopilotOffline():boolean{
    let autopilot = this.autoPilotService.AutoPilot(this.selectedDrone)
    return !autopilot.is_running
  }

  public get getGPSStatus() :GPSStatus{
    let coordinates = this.droneData.droneCoordinates(this.selectedDrone)
    if(coordinates == null) { return GPSStatus.not_registered } 
    if((coordinates.latitude === coordinates.longitude && coordinates.longitude === 500)) return GPSStatus.unavailable
    return GPSStatus.ready
  }

  public get getGPSStrength() : GPSStrength{
    return this.droneData.gpsStrength(this.selectedDrone)
  }


  public get getWifiStatus() :WifiStatus{
    let coordinates = this.droneData.droneWifi(this.selectedDrone)
    if(coordinates == -500) { return WifiStatus.unavailable } 
    return WifiStatus.ready
  }

  public get getWifiStrength() : WifiStrength{
    return this.droneData.wifiStrength(this.selectedDrone)
  }

}
