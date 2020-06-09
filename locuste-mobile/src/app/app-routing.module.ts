import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DronePreviewComponent } from './components/drone-preview/drone-preview.component';


const routes: Routes = [
  {path: '**', component: DronePreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
