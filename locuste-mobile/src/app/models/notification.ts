export enum NotificationType{
    success,
    warning,
    error,
    info
}


export enum DroneConnectionStatus{
    connected,
    connecting,
    disconnected
}


export interface INotification {}
export class Notification implements Notification {
    constructor(public message: string, public type : NotificationType = NotificationType.info){}
}


export class WebSocketNotification extends Notification{
    constructor(public message: string, public type : NotificationType = NotificationType.info){
        super(message, type)
    }
}

export class DroneNotification extends Notification{
    constructor(public name: string, public droneStatus : DroneConnectionStatus,  public message: string, public type : NotificationType = NotificationType.info){
        super(message,type)
    }
}

export class DroneInternalStatusNotification {
    public id: string;
    public status: string;
    public result: any;
    
}