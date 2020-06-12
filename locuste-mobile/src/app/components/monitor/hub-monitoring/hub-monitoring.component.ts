import { Component, OnInit } from '@angular/core';
import { SocketStatus, PcToHubStatus, HubStatus, AutomatonStatus, HubToAutomatonStatus} from 'src/app/models/status';
import { DroneConnectionStatus } from 'src/app/models/notification';
import { StatusToReadable, DroneStatus } from 'src/app/models/drone';
import { System, SubSystem } from 'src/app/models/health';
import { DroneDataService } from 'src/app/services/drones/drone-data.service';
import { OperatorService } from 'src/app/services/users/operator.service';
import { PingService } from 'src/app/services/health/ping.service';
import { HealthMonitoringService } from 'src/app/services/health/health-monitoring.service';
import { ControlSocketService } from 'src/app/services/sockets/control-socket.service';
import { ExternalModMonitoringService } from 'src/app/services/health/external-mod-monitoring.service';

@Component({
  selector: 'app-hub-monitoring',
  templateUrl: './hub-monitoring.component.html',
  styleUrls: ['./hub-monitoring.component.scss']
})
export class HubMonitoringComponent implements OnInit {
  public SocketStatus = SocketStatus;
  public PcToHubStatus = PcToHubStatus;
  public HubToAutomatonStatus = HubToAutomatonStatus;
  
  public HubStatus = HubStatus;
  public AutomatonStatus = AutomatonStatus;
  public DroneConnectionStatus = DroneConnectionStatus;
  public StatusToReadable = StatusToReadable;
  
  public System = System;
  public SubSystem = SubSystem;

  public externalModuleRestart(target: string, system: System, module: SubSystem){
    if(!this.dronedata.availableDrones.includes(target)) return;
    if(System.External !== system) return;
    this.extModuleMonitoring.restartModule(target, module);
  }
  
  public brainModuleRestart(system: string, module: string){
    this.health.restartModule(system, module);
  }

  public get socketConnection(){
    return this.connector.websocketStatus;
  }

  constructor(public dronedata : DroneDataService, public operatorService: OperatorService, public health: PingService, public automatonMonitoring : HealthMonitoringService, private extModuleMonitoring: ExternalModMonitoringService, private connector: ControlSocketService) {
    dronedata.availableDrones.forEach(droneName => {
      extModuleMonitoring.forceUpdate(droneName);
    })
    
  }

  ngOnInit(): void {
  }

  public getKeys(map: any){
      return Array.from(map.keys());
  }

  public automatonStatus(name: string){
    return this.automatonMonitoring.automatonStatus(name);
  }

  public moduleStatus(name: string){
    let result = this.extModuleMonitoring.moduleStatuses(name);
    if(result != null) return result;
    return new Map<string, Map<string, boolean>>()
  }


  public availableFields(statut: DroneStatus): Array<string>{
    return Object.keys(statut);
  }

  public displayStatus(statut: StatusToReadable, current: boolean): string{
    switch(statut){
      case StatusToReadable.on_error:
        return (current ? "error-text" : "ok-text"); 
      case StatusToReadable.sim:
      case StatusToReadable.manual:
        return (current ? "warning-text":"ok-text");
      default : 
        return (current ? "ok-text" : "error-text");
    }
  }

}
