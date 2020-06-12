# locuste.dashboard.mobile
LOCUSTE : Interface graphique MOBILE ANGULAR 

<img width="2575" alt="locuste-mobile-banner" src="https://user-images.githubusercontent.com/6602774/84285948-5aec9e80-ab3e-11ea-9a2c-3b4c23b80ad4.png">

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d2740d746019415ba3a21526e7845483)](https://www.codacy.com/manual/axel.maciejewski/locuste.dashboard.mobile?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DaemonToolz/locuste.dashboard.mobile&amp;utm_campaign=Badge_Grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DaemonToolz_locuste.dashboard.mobile&metric=alert_status)](https://sonarcloud.io/dashboard?id=DaemonToolz_locuste.dashboard.mobile)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=DaemonToolz_locuste.dashboard.mobile&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=DaemonToolz_locuste.dashboard.mobile)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=DaemonToolz_locuste.dashboard.mobile&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=DaemonToolz_locuste.dashboard.mobile)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DaemonToolz_locuste.dashboard.mobile&metric=security_rating)](https://sonarcloud.io/dashboard?id=DaemonToolz_locuste.dashboard.mobile)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=DaemonToolz_locuste.dashboard.mobile&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=DaemonToolz_locuste.dashboard.mobile)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=DaemonToolz_locuste.dashboard.mobile&metric=bugs)](https://sonarcloud.io/dashboard?id=DaemonToolz_locuste.dashboard.mobile)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=DaemonToolz_locuste.dashboard.mobile&metric=coverage)](https://sonarcloud.io/dashboard?id=DaemonToolz_locuste.dashboard.mobile)

Le project Locuste se divise en 4 grandes sections : 
* Automate (Drone Automata) PYTHON (https://github.com/DaemonToolz/locuste.drone.automata)
* Unité de contrôle (Brain) GOLANG (https://github.com/DaemonToolz/locuste.service.brain)
* Unité de planification de vol / Ordonanceur (Scheduler) GOLANG (https://github.com/DaemonToolz/locuste.service.osm)
* Interface graphique (UI) ANGULAR (https://github.com/DaemonToolz/locuste.dashboard.ui)

![Composants](https://user-images.githubusercontent.com/6602774/83644711-dcc65000-a5b1-11ea-8661-977931bb6a9c.png)

Tout le système est embarqué sur une carte Raspberry PI 4B+, Raspbian BUSTER.
* Golang 1.11.2
* Angular 9
* Python 3.7
* Dépendance forte avec la SDK OLYMPE PARROT : (https://developer.parrot.com/docs/olympe/, https://github.com/Parrot-Developers/olympe)

![Vue globale](https://user-images.githubusercontent.com/6602774/83644783-f10a4d00-a5b1-11ea-8fed-80c3b76f1b00.png)

Détail des choix techniques pour la partie Interface Graphique :

* [Angular] - Exposer et envoyer rapidement une application web qui intègre toutes les composantes de sécurité
* [SocketIO] - Elément facile intégré avec Angular, Node et Python (temps-réel)
