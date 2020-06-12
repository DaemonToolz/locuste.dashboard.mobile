import { Injectable } from '@angular/core';
import { ControlSocketService } from '../sockets/control-socket.service';
import { GenericHttpClientService } from '../generic-http-client.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first, take } from 'rxjs/operators';
import { SubSystem } from 'src/app/models/health';

@Injectable({
  providedIn: 'root'
})
export class ExternalModMonitoringService extends GenericHttpClientService<any> {
  private _onStatusUpdate: Subscription;
  private _onConnectionEvent: Subscription;


  private _moduleStatuses : Map<string, Map<string, Map<string, boolean> > >= new Map<string, Map<string, Map<string, boolean> > >();

  
  constructor(_http: HttpClient,  private updaters: ControlSocketService) { 
    super(_http)
    this.init(environment.services.drone_info); 

    this._onStatusUpdate = this.updaters.externalModuleStatusUpdate$.subscribe((identifier) => {
      if(identifier != null && identifier.name != null && identifier.name.trim() !== ""){
        this.fetchStatus(identifier.name).pipe(first()).subscribe(data => {
          this.healthMapToArray(identifier.name, new Map(Object.entries(data)));
        })        
      }
    })

    this._onConnectionEvent = this.updaters.droneEvents$.subscribe(notification => {
      if(notification != null && notification.name != null && notification.name.trim() !== ""){
        this.fetchStatus(notification.name).pipe(first()).subscribe(data => {
          this.healthMapToArray(notification.name, new Map(Object.entries(data)));
        })
      }
    })

  }


  private healthMapToArray(target: string, input : Map<string,boolean>){
    input.forEach((value: boolean, key: string) => {
      let systemData = key.split(".");
      if(!this._moduleStatuses.has(target)){
        this._moduleStatuses.set(target,new Map<string, Map<string, boolean> >());
        this._moduleStatuses.get(target).set(systemData[0], new Map<string, boolean>())
      }
      this._moduleStatuses.get(target).get(systemData[0]).set(systemData[1], value);
    });
    
  }


  public forceUpdate(name: string): void {
    if( name == null || name.trim() === ""){
      return;
    }
    this.fetchStatus(name).pipe(take(1)).subscribe(data => {
      this.healthMapToArray(name, new Map(Object.entries(data)));
    });
  }

  private fetchStatus(droneName:string){
    return this.get(`drone/${droneName}/health`);
  }


  public moduleStatuses(name: string){
    return this._moduleStatuses.get(name);
  }

  public restartModule(droneName: string, module: SubSystem){
    let target = ""
    switch(module){
      case SubSystem.VideoStream:
        target = "stream"  
        break;
      case SubSystem.VideoServer:
        target = "video"
        break;
    }
    this.get(`drone/${droneName}/${target}/restart`).pipe(take(1)).subscribe();
  }
}
