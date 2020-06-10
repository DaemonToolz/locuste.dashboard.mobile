import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rtspstreamer',
  templateUrl: './rtspstreamer.component.html',
  styleUrls: ['./rtspstreamer.component.scss']
})
export class RTSPStreamerComponent implements OnInit {

  @ViewChild('streaming') public streamingcanvas: ElementRef;

  @Input() public width: number
  @Input() public height: number
  @Input() public drone: string;

  private player: any


  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  }


  ngAfterViewInit() {
    let my_ip = this.drone.split("_")[1];
    let target_port = my_ip.split(".")[2];
    this.player = new JSMpeg.Player(environment.services.video_server + `70${target_port}`, { // 192.168.1.66
      canvas: this.streamingcanvas.nativeElement, // Canvas should be a canvas DOM element,
      audio: false,
      preserveDrawingBuffer: true,
      chunkSize: (1024*1024)*50,
      videoBufferSize: (1024*1024)*50,
    })

  }


}
