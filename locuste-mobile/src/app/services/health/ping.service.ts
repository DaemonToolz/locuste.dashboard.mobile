import { Injectable } from '@angular/core';
import { GenericHttpClientService } from '../generic-http-client.service';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first, take } from 'rxjs/operators';
import { SocketStatus } from 'src/app/models/status';
import { ControlSocketService } from '../sockets/control-socket.service';

@Injectable({
  providedIn: 'root'
})
export class PingService extends GenericHttpClientService<any>{
 
  private _healthMonitor : Map<string, Map<string, boolean>> = new Map<string, Map<string, boolean>>()
  public isRelayReachable: boolean = true; // On assume par défaut que ça marche
  private source = interval(5000);
  private myErrors : Subscription;

  public get healthMonitor(){
    return this._healthMonitor;
  } 


  private healthMapToArray(input : Map<string,boolean>){
    input.forEach((value: boolean, key: string) => {
      let systemData = key.split(".");
      if(!this._healthMonitor.has(systemData[0])){
        this._healthMonitor.set(systemData[0],new Map<string, boolean>());
      }
      this._healthMonitor.get(systemData[0]).set(systemData[1], value);
    });
    
  }

  constructor(_http: HttpClient, private updater: ControlSocketService) {
    super(_http);
    this.init(environment.services.drone_info); 
    this.source.subscribe(() => {
      this.get("health").pipe(first()).subscribe(data => {
        this.healthMapToArray(new Map(Object.entries(data)));
        this.connected(true);
      }, err => this.connected(false))
    }, err => this.connected(false));

    this.myErrors = this.onError.subscribe((error) => {
      this.connected(false);
    })
  }

  public connected(data: boolean) {
    this.isRelayReachable = data;
  }

  public restartModule(system: string, subsystem : string){
    if(this.isRelayReachable){
      this.restartModuleRequest(system, subsystem)
    } else if(this.updater.websocketStatus === SocketStatus.connected){
      this.updater.restartModuleRequest(system, subsystem)
    }
  }

  private restartModuleRequest(system: string, subsystem: string) {
    this.post("server/module/restart", {"system": system, "subsystem": subsystem}).pipe(take(1)).subscribe();
  }
}
