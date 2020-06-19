import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IdentificationPortalComponent } from './components/shared/identification-portal/identification-portal.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlSocketService } from './services/sockets/control-socket.service';
import { OperatorService } from './services/users/operator.service';
import { Operator } from './models/operator';
import { LogUpdateService } from './services/pwa/log-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'locuste-mobile';

  constructor(public appUpdater : LogUpdateService, private socket: ControlSocketService, private operatorService: OperatorService, private matIconRegistry: MatIconRegistry, private dialog: MatDialog, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(`drone_icon`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/drone.svg`));
    this.matIconRegistry.addSvgIcon(`error_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/error_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`error_hub_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/error_hub_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`error_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/error_hub.svg`));
    this.matIconRegistry.addSvgIcon(`error_pc`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/error_pc.svg`));
    this.matIconRegistry.addSvgIcon(`error_pc_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/error_pc_hub.svg`));
    this.matIconRegistry.addSvgIcon(`error_video_server`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/error_video_server.svg`));

    this.matIconRegistry.addSvgIcon(`info_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/info_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`info_hub_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/info_hub_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`info_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/info_hub.svg`));
    this.matIconRegistry.addSvgIcon(`info_pc`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/info_pc.svg`));
    this.matIconRegistry.addSvgIcon(`info_pc_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/info_pc_hub.svg`));
    this.matIconRegistry.addSvgIcon(`info_video_server`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/info_video_server.svg`));

    this.matIconRegistry.addSvgIcon(`success_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/success_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`success_hub_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/success_hub_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`success_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/success_hub.svg`));
    this.matIconRegistry.addSvgIcon(`success_pc`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/success_pc.svg`));
    this.matIconRegistry.addSvgIcon(`success_pc_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/success_pc_hub.svg`));
    this.matIconRegistry.addSvgIcon(`success_video_server`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/success_video_server.svg`));


    this.matIconRegistry.addSvgIcon(`warn_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/warn_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`warn_hub_automaton`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/warn_hub_automaton.svg`));
    this.matIconRegistry.addSvgIcon(`warn_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/warn_hub.svg`));
    this.matIconRegistry.addSvgIcon(`warn_pc`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/warn_pc.svg`));
    this.matIconRegistry.addSvgIcon(`warn_pc_hub`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/warn_pc_hub.svg`));
    this.matIconRegistry.addSvgIcon(`warn_video_server`, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/warn_video_server.svg`));


    window.addEventListener('beforeinstallprompt', event => {
      this.appUpdater.installAvaiable = event;
    });
  }

  public authenticate() {
    if (this.operatorService.myself != null && this.operatorService.myself.name.length > 0) {
      const dialogRef = this.dialog.open(IdentificationPortalComponent, {
        width: '100%'
      });


      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.operatorService.authenticate(result)
        }
      });
    }
  }

  public installPwa(): void {
    this.appUpdater.installAvaiable.prompt();
  }

  public get myself(): Operator{
    return this.operatorService.myself
  }
}
