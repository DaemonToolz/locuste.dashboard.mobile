import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-screen-viewer',
  templateUrl: './full-screen-viewer.component.html',
  styleUrls: ['./full-screen-viewer.component.scss']
})
export class FullScreenViewerComponent implements OnInit {


  private _width: number;
  private _height: number;
  public selectedDrone: string;

  public get width() { return this._width }
  public get height() { return this._height }

  constructor(private route: ActivatedRoute) {
    this.selectedDrone = this.route.snapshot.paramMap.get('droneid');
  
    this.calculateDim();
  }


  private calculateDim() {
    this._width = window.outerWidth;

    this._height = window.outerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateDim();
  }

  ngOnInit(): void {
  }

}
