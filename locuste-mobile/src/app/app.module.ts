import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatSidenavModule} from '@angular/material/sidenav'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DronePreviewComponent } from './components/drone-preview/drone-preview.component';
import { DroneConsoleComponent } from './components/drone-console/drone-console.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon"
import {MatListModule} from "@angular/material/list"
import {MatButtonModule} from "@angular/material/button"
import {MatDialogModule} from "@angular/material/dialog"
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatCardModule} from "@angular/material/card"
import {MatInputModule} from "@angular/material/input"
import { FormsModule } from '@angular/forms';

import { IdentificationPortalComponent } from './components/shared/identification-portal/identification-portal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RTSPStreamerComponent } from './components/shared/rtspstreamer/rtspstreamer.component';
import { FullScreenViewerComponent } from './components/shared/full-screen-viewer/full-screen-viewer.component';
import { HubMonitoringComponent } from './components/monitor/hub-monitoring/hub-monitoring.component'
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ControlSocketService } from './services/sockets/control-socket.service';
import { DroneDiscoveryService } from './services/discovery/drone-discovery.service';
import { DroneDataService } from './services/drones/drone-data.service';
import { PingService } from './services/health/ping.service';
import { OperatorService } from './services/users/operator.service';
import { DroneMapComponent } from './components/shared/drone-map/drone-map.component';
import { LogUpdateService } from './services/pwa/log-update.service';
import { AppUpdaterService } from './services/pwa/app-updater.service';

@NgModule({
  declarations: [
    AppComponent,
    DronePreviewComponent,
    DroneConsoleComponent,
    IdentificationPortalComponent,
    RTSPStreamerComponent,
    FullScreenViewerComponent,
    HubMonitoringComponent,
    DroneMapComponent
  ],
  entryComponents:[
    IdentificationPortalComponent
  ],
  imports: [
    LeafletModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DroneDiscoveryService, ControlSocketService, DroneDataService, PingService, OperatorService, LogUpdateService, AppUpdaterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
