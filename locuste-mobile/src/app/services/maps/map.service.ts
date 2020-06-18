import { Injectable } from '@angular/core';
import { Boundaries } from 'src/app/models/map';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericHttpClientService } from '../generic-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MapService extends GenericHttpClientService<Boundaries> {

  constructor(_http: HttpClient) { 
    super(_http)  
    this.init(environment.services.drone_info); 
  }

  public getMapBoundaries(){
    return this.get("map/boundaries");
  }

}