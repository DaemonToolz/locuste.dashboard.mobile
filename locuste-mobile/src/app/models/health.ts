export enum System{
    Brain = "Unité de contrôle",
    Scheduler = "Unité de planification",
    External = "Modules externes"
}

export enum SubSystem{
    FileWatcher = "Gestionnaire d'états internes",
    SocketServer = "Serveur WebSocket",
    HttpServer = "Serveur HTTP",
    Runner = "Processus d'exécution",
    SchedulerConnection = "Connexion au planfiicateur",
    RPCServer = "Serveur de communication Inter-pocessus",
  
    // Section composants dédiés
    VideoServer = "Serveur vidéo",
    VideoStream = "Flux vidéo",

    // Section Scheduler 
    BrainConnection = "Connexion à l'unité de contrôle",
    MapHandler = "Gestionnaire de cartes",
    FlightManager = "Ordonnanceur de vol"
}