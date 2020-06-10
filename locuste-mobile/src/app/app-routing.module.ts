import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DronePreviewComponent } from './components/drone-preview/drone-preview.component';
import { DroneConsoleComponent } from './components/drone-console/drone-console.component';
import { FullScreenViewerComponent } from './components/shared/full-screen-viewer/full-screen-viewer.component';
import { HubMonitoringComponent } from './components/monitor/hub-monitoring/hub-monitoring.component';


const routes: Routes = [
  {path:'monitor', component:HubMonitoringComponent},
  {path:'fullscreen/:droneid', component:FullScreenViewerComponent},
  {path:'console/:droneid', component:DroneConsoleComponent},
  {path: '**', component: DronePreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
