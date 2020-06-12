export enum SocketFunction{
    Connect = "connect",
    Connecting = "connecting",
    Disconnect = "disconnect",
    Reconnect = "reconnect",
    Reconnecting = "reconnecting",
    OnError = "error",
    OnReconnectError = "reconnect_error",
    IdentifyOperator="identify_operator", // identify_mobile
    ReleaseControls="release_controls",
    Authenticate="authenticate",
    RequestModuleRestart="restart_module",
  }

  
  export enum MyListeners{
    OnIdentifiedDrone="identify",
    OnUpdatedPosition="position_update",
    OnStatusUpdate="drone_status_update",
    OnDroneDisconnect="relay_endpoint_disconnect",
    OnDroneDiscovery="drone_discovery",
    OnPyDroneAcknowledge="acknowledge",
    OnInternalChange="internal_status_changed",
    OnAutomatonChange="automaton_status_changed",
    OnExternalModuleChange="external_module_update",
    OnOperatorChange="operator_update",
    OnScheduleUpdate="add_on_schedule",
    OnTargetRecalculated="target_recalculated",
    OnAutopilotUpdate="autopilot_update",
    OnFlyingStatusUpdate="flying_status_update"
  }