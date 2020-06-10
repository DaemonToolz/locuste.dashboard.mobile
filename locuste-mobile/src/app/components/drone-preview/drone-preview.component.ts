import { Component, OnInit, HostListener } from '@angular/core';

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
   
    this.calculateDim();
  } 
  ngOnInit(): void {
  }

  private calculateDim(){
    if(window.outerWidth > window.outerHeight){
      this._width = window.outerHeight / 1.15;
      //this._height = window.outerHeight/1.5;
    } else {
      this._width = window.outerWidth/1.10;
      //this._height = window.outerHeight/1.5;
    }
    this._height = this._width * (9/16);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    this.calculateDim();
  }

}
