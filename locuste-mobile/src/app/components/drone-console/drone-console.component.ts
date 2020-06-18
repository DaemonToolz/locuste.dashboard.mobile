import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';
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

  private leftOngoing: boolean;
  private rightOngoing: boolean;
  

  @ViewChild("left") public left: ElementRef;
  @ViewChild("right") public right: ElementRef;

  ngAfterViewInit() {
   
  }

  private _width: number;
  private _height: number;
  public joystickVisible = false;
  public selectedDrone: string;

  public get width() { return this._width }
  public get height() { return this._height }

  constructor(private route: ActivatedRoute) {
    this.selectedDrone = this.route.snapshot.paramMap.get('droneid');

    this.calculateDim();
  }

  public toogleJoystick(){
    this.joystickVisible = !this.joystickVisible;

    if(this.joystickVisible){
      var leftOptions = {
        zone: this.left.nativeElement,
        mode: "static",
        position: { bottom: "25%", left: "50%" }
      };
      this.leftManager = nipplejs.create(leftOptions);
      this.initJoystick("left")
      var rightOptions = {
        zone: this.right.nativeElement,
        mode: "static",
        position: { bottom: "25%", right: "50%" }
      };
      this.rightManager = nipplejs.create(rightOptions);
      this.initJoystick("right")

    } else {
      if(this.leftManager != null){
        this.leftManager.destroy();
      }
      if(this.rightManager != null){
        this.rightManager.destroy();
      }
    }
  }

  private initJoystick(manager: string){
    const self = this;
    this[`${manager}Manager`].on('start move end', function (evt, data) {
      if(evt.type === "start"){
        this[`${manager}Ongoing`] = true
      }

      if(evt.type === "end"){
        this[`${manager}Ongoing`] = false
      }

      if(evt.type === "move"){
        //console.log(data);
        // leftevent + rightevent 
      }
    });
  
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
