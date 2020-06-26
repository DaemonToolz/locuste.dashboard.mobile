export enum ManualCommandRequest{
    RequestManualFlight = "request_manual",
    RequestAutomaticFlight = "request_automatic",
    RequestEmergencyDisconnect = "request_emergency_disconnect",
    RequestEmergencyReconnect = "request_emergency_reconnect",
    RequestNormal = "request_normal",
    RequestSimulation = "request_simulation"
}

export enum AutomatedCommandRequest{
    TakeOff = "takeoff",
    GoHome = "home"
}
