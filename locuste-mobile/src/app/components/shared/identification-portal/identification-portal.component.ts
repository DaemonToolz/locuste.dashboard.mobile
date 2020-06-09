import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-identification-portal',
  templateUrl: './identification-portal.component.html',
  styleUrls: ['./identification-portal.component.scss']
})
export class IdentificationPortalComponent implements OnInit {

  public name: string

  constructor(public dialogRef: MatDialogRef<IdentificationPortalComponent>) { }



  ngOnInit(): void {
  }

}
