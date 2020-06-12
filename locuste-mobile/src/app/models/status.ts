export enum SocketStatus{
    connected,
    disconnected,
    connecting
}

export enum PcToHubStatus{
    connected = "success_pc_hub",
    disconnected = "error_pc_hub",
    connecting = "info_pc_hub"
}

export enum HubStatus{
    connected = "success_hub",
    disconnected = "error_hub",
    connecting = "info_hub"
}


export enum AutomatonStatus{
    connected = "success_automaton",
    disconnected = "error_automaton",
    connecting = "info_automaton",
    warning = "warn_automaton"
}

export enum HubToAutomatonStatus{
    connected = "success_hub_automaton",
    disconnected = "error_hub_automaton",
    connecting = "info_hub_automaton"
}