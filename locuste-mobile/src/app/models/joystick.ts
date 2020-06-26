
export class  JoystickEvent {
    public drone_id: string
    public payload: any;
}

export enum ControlType {
    Camera,
    Drone,
}