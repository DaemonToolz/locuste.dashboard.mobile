import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var require: any;
const nipplejs = require('nipplejs');

@Component({
  selector: 'app-drone-console',
  templateUrl: './drone-console.component.html',
  styleUrls: ['./drone-console.component.scss']
})
export class DroneConsoleComponent implements OnInit, AfterViewInit {

  private leftManager: any;
  private rightManager: any;

  @ViewChild("left") public left: ElementRef;
  @ViewChild("right") public right: ElementRef;

  ngAfterViewInit() {
    var leftOptions = {
      zone: this.left.nativeElement,
      mode: "static",
      position: { bottom: "25%", left: "50%" }
    };
    this.leftManager = nipplejs.create(leftOptions);

    var rightOptions = {
      zone: this.right.nativeElement,
      mode: "static",
      position: { bottom: "25%", right: "50%" }
    };
    this.rightManager = nipplejs.create(rightOptions);
  }
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
    if (window.outerWidth > window.outerHeight) {
      this._width = window.outerHeight / 1.15;
      //this._height = window.outerHeight/1.5;
    } else {
      this._width = window.outerWidth / 1.10;
      //this._height = window.outerHeight/1.5;
    }
    this._height = this._width * (9 / 16);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateDim();
  }

  ngOnInit(): void {
  }

}
