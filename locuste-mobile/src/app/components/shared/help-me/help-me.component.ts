import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HelpService } from 'src/app/services/users/help.service';
import { HelpMeModel } from 'src/app/models/help';

@Component({
  selector: 'app-help-me',
  templateUrl: './help-me.component.html',
  styleUrls: ['./help-me.component.scss']
})
export class HelpMeComponent  {
  @ViewChild('helpGroup') helpGroup;

  public displayedColumns: string[] = ['content', 'description'];

  constructor(private helpService: HelpService) { 

  }

  public get helpPage(): HelpMeModel[]{
    return this.helpService.currentPage;
  }

  ngAfterViewInit(): void {
    this.helpService.loadDesiredSection(this.helpGroup.selectedIndex)
  }
  

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.helpService.loadDesiredSection(tabChangeEvent.index)
  }

}
