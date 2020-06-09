import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drone-preview',
  templateUrl: './drone-preview.component.html',
  styleUrls: ['./drone-preview.component.scss']
})
export class DronePreviewComponent implements OnInit {
  private _width : number;
  private _height: number;
  
  public get width(){return this._width}
  public get height(){return this._height}

  public constructor() { 
    this._width = window.outerWidth/1.5;
    this._height = window.outerHeight/1.5;
    

  } 
  ngOnInit(): void {
  }

}
