import { Injectable } from '@angular/core';
import { SocketStatus } from 'src/app/models/status';
import { BehaviorSubject } from 'rxjs';
import { WebSocketNotification, DroneNotification, DroneInternalStatusNotification, DroneConnectionStatus, NotificationType } from 'src/app/models/notification';
import { DroneIdentifier, IdentificationRequest } from 'src/app/models/drone';
import { DroneCoordinates, DroneFlightCoordinates, SimplifiedDroneFlightCoordinates } from 'src/app/models/coordinates';
import { environment } from 'src/environments/environment';
import { SocketFunction, MyListeners } from 'src/app/models/socket';
import * as io from 'socket.io-client';
import { SchedulerSummarizedData, DroneSummarizedStatus } from 'src/app/models/autopilot';
import { JoystickEvent } from 'src/app/models/joystick';
@Injectable({
  providedIn: 'root'
})
export class ControlSocketService {
  private static Socket: SocketIOClient.Socket;
  private static WebsocketStatus : SocketStatus;
  private static MyTimers : Map<string, any>  = new Map<string,any>();

  public get websocketStatus(){
    return ControlSocketService.WebsocketStatus;
  }

  public get socket(){
    return ControlSocketService.Socket;
  }

  private clearTimer(name: string){
    if(ControlSocketService.MyTimers.has(name)){
      clearTimeout(ControlSocketService.MyTimers.get(name))
      ControlSocketService.MyTimers.delete(name)
    }
  }

  public socketEvents$ : BehaviorSubject<WebSocketNotification> = new BehaviorSubject(null);
  public droneEvents$ : BehaviorSubject<DroneNotification> = new BehaviorSubject(null);
  public statusUpdate$ : BehaviorSubject<DroneIdentifier> = new BehaviorSubject<DroneIdentifier>(null);
  public internalStatusUpdate$ : BehaviorSubject<DroneInternalStatusNotification> = new BehaviorSubject<DroneInternalStatusNotification>(null);
  public externalModuleStatusUpdate$ : BehaviorSubject<DroneIdentifier> = new BehaviorSubject<DroneIdentifier>(null);
  public operatorUpdate$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public positionUpdate$ : BehaviorSubject<DroneCoordinates> = new BehaviorSubject(null);
  public autopilotUpdate$ : BehaviorSubject<DroneFlightCoordinates> = new BehaviorSubject(null);

  public autopilotStatusUpdate$ : BehaviorSubject<SchedulerSummarizedData> = new BehaviorSubject(null);
  public flyingStatusUpdate$ : BehaviorSubject<DroneSummarizedStatus> = new BehaviorSubject(null);
  
  public targetUpdate$ : BehaviorSubject<SimplifiedDroneFlightCoordinates> = new BehaviorSubject(null);

  constructor() { 

    if (!ControlSocketService.Socket) {
      ControlSocketService.Socket = io(environment.services.brain_connector, { transports: ['websocket'] });
      
      ControlSocketService.Socket.on(SocketFunction.Disconnect, (reason) => {
        if (reason === 'io server disconnect') {
          ControlSocketService.Socket.connect();
        }
        ControlSocketService.WebsocketStatus = SocketStatus.disconnected;
        this.droneEvents$.next(new DroneNotification(null, DroneConnectionStatus.disconnected, "Déconnecté du relai" , NotificationType.error))
        this.socketEvents$.next(new WebSocketNotification(`̀Déconnecté car ${reason}`, NotificationType.error))
      });

      ControlSocketService.Socket.on(SocketFunction.Connect, () => {
        ControlSocketService.Socket.emit(SocketFunction.IdentifyOperator);
        ControlSocketService.WebsocketStatus = SocketStatus.connected;
        this.socketEvents$.next(new WebSocketNotification("Connexion établie", NotificationType.success))
        this.droneEvents$.next(new DroneNotification(null, DroneConnectionStatus.connecting, "En attente de réponse", NotificationType.error))
      });


      ControlSocketService.Socket.on(SocketFunction.Connecting, () => {

        ControlSocketService.WebsocketStatus = SocketStatus.connecting;
        this.socketEvents$.next(new WebSocketNotification("Connexion en cours", NotificationType.info))
        this.droneEvents$.next(new DroneNotification(null, DroneConnectionStatus.disconnected, "Connexion au relai", NotificationType.error))
      });


      ControlSocketService.Socket.on(SocketFunction.Reconnect, () => {
        ControlSocketService.WebsocketStatus = SocketStatus.connected;
        this.socketEvents$.next(new WebSocketNotification("Connexion établie",NotificationType.success))
      });

      ControlSocketService.Socket.on(SocketFunction.Reconnecting, () => {
        
        ControlSocketService.WebsocketStatus = SocketStatus.connecting;
        this.socketEvents$.next(new WebSocketNotification("Reconnexion en cours", NotificationType.info))
        this.droneEvents$.next(new DroneNotification(null, DroneConnectionStatus.disconnected, "Relai injoignable", NotificationType.error))
      });


      ControlSocketService.Socket.on(SocketFunction.OnError, () => {
        ControlSocketService.WebsocketStatus = SocketStatus.disconnected;
        this.socketEvents$.next(new WebSocketNotification("Impossible de se connecter au service", NotificationType.error))
        this.droneEvents$.next(new DroneNotification(null, DroneConnectionStatus.disconnected, "Relai injoignable", NotificationType.error))
      })

      ControlSocketService.Socket.on(SocketFunction.OnReconnectError, () => {
        ControlSocketService.WebsocketStatus = SocketStatus.disconnected;
        this.socketEvents$.next(new WebSocketNotification("Echec de la reconnexion", NotificationType.error))
        this.droneEvents$.next(new DroneNotification(null, DroneConnectionStatus.disconnected, "Relai injoignable", NotificationType.error))
      })

      ControlSocketService.Socket.on(MyListeners.OnUpdatedPosition, (newPosition: DroneCoordinates) => {
        this.positionUpdate$.next(newPosition)
      })

      ControlSocketService.Socket.on(MyListeners.OnInternalChange, (data ) => {
        try {
          let status = data as DroneInternalStatusNotification
          this.internalStatusUpdate$.next(status);
        } catch(error) {
          
        }
      })

      ControlSocketService.Socket.on(MyListeners.OnPyDroneAcknowledge, (identification: DroneIdentifier) => {
        this.clearTimer(identification.name)
        this.droneEvents$.next(new DroneNotification(identification.name, DroneConnectionStatus.connected, "Réponse obtenue", NotificationType.success))
      })


      ControlSocketService.Socket.on(MyListeners.OnIdentifiedDrone, (identification: IdentificationRequest) => {
        this.clearTimer(identification.name)
        this.droneEvents$.next(new DroneNotification(identification.name, DroneConnectionStatus.connected, "Drone identifié", NotificationType.success))
      })

      ControlSocketService.Socket.on(MyListeners.OnDroneDiscovery, (identification: DroneIdentifier) => {
        this.droneEvents$.next(new DroneNotification(identification.name, DroneConnectionStatus.connecting, "En attente de réponse", NotificationType.success))
        this.clearTimer(identification.name)
        ControlSocketService.MyTimers.set(identification.name,setTimeout(()=>{    
          this.droneEvents$.next(new DroneNotification(identification.name, DroneConnectionStatus.disconnected, "Aucune réponse", NotificationType.error))
        }, 5000));
      })

      ControlSocketService.Socket.on(MyListeners.OnDroneDisconnect, (identification: DroneIdentifier) => {
        this.droneEvents$.next(new DroneNotification(identification.name, DroneConnectionStatus.disconnected, "Drone déconnecté", NotificationType.error))
      })

      ControlSocketService.Socket.on(MyListeners.OnAutomatonChange, (identification: DroneIdentifier) => {
        this.statusUpdate$.next(identification)
      })

      ControlSocketService.Socket.on(MyListeners.OnExternalModuleChange, (identification: DroneIdentifier) => {
        this.externalModuleStatusUpdate$.next(identification)
      })

      ControlSocketService.Socket.on(MyListeners.OnOperatorChange, () => {
        this.operatorUpdate$.next(true)
      })

      ControlSocketService.Socket.on(MyListeners.OnScheduleUpdate, (update : DroneFlightCoordinates) => {
        this.autopilotUpdate$.next(update)
      })

      ControlSocketService.Socket.on(MyListeners.OnAutopilotUpdate, (update : SchedulerSummarizedData) => {
        this.autopilotStatusUpdate$.next(update)
      })

      ControlSocketService.Socket.on(MyListeners.OnFlyingStatusUpdate, (update : DroneSummarizedStatus) => {
        this.flyingStatusUpdate$.next(update)
      })


      ControlSocketService.Socket.on(MyListeners.OnTargetRecalculated, (update : SimplifiedDroneFlightCoordinates) => {
        this.targetUpdate$.next(update)
      })
     
     
    }
  }


  public sendCommand(event : JoystickEvent){
    ControlSocketService.Socket.emit("joystick_event",  event);
  }

  public authenticate(name: string){
    ControlSocketService.Socket.emit(SocketFunction.Authenticate, {"name":name});
  }


  public releaseControls(){
    ControlSocketService.Socket.emit(SocketFunction.ReleaseControls, {});
    }
  // System[system], SubSystem[subsystem]
  public restartModuleRequest(system: string, subsystem: string){
    ControlSocketService.Socket.emit(SocketFunction.RequestModuleRestart, {"system": system, "subsystem": subsystem});
  }
}
