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
import {MatInputModule} from "@angular/material/input"
import { FormsModule } from '@angular/forms';
import { IdentificationPortalComponent } from './components/shared/identification-portal/identification-portal.component'
@NgModule({
  declarations: [
    AppComponent,
    DronePreviewComponent,
    DroneConsoleComponent,
    IdentificationPortalComponent
  ],
  entryComponents:[
    IdentificationPortalComponent
  ],
  imports: [
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
