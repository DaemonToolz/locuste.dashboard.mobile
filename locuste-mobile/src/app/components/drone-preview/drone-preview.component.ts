import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { ViewsEnum } from 'src/app/models/views';
import { BatteryStatus, GPSStatus, GPSStrength, WifiStatus, WifiStrength } from 'src/app/models/drone';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DroneDataService } from 'src/app/services/drones/drone-data.service';
import { OperatorService } from 'src/app/services/users/operator.service';
import { HealthMonitoringService } from 'src/app/services/health/health-monitoring.service';

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


  public constructor(private droneData :DroneDataService,  private operatorService: OperatorService, private droneStatusController: HealthMonitoringService)  { 
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


}
