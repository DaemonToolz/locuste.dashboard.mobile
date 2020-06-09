import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IdentificationPortalComponent } from './components/shared/identification-portal/identification-portal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'locuste-mobile';

  constructor(private dialog: MatDialog) {

  }


  public authenticate() {

    const dialogRef = this.dialog.open(IdentificationPortalComponent, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
}
