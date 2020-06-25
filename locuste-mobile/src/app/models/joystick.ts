
export class  JoystickEvent {
    public drone_id: string
    public payload: any;
    public joystick_type: JoystickType
}

export enum JoystickType {
	SpeedJoystick = 0,
	AltitutdeJoystick,
}