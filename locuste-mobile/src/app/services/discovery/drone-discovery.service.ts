import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpClientService } from '../generic-http-client.service';

import { environment } from 'src/environments/environment';
import { Drone } from 'src/app/models/drone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DroneDiscoveryService  extends GenericHttpClientService<string> {

  constructor(_http: HttpClient) { 
    super(_http)
    this.init(environment.services.drone_info); 
  }

  public getDroneInfo() : Observable<string[]>{
    return this.getArray("drones");
  }
}