import { Injectable } from '@angular/core';
import { GenericHttpClientService } from '../generic-http-client.service';
import { DroneSummarizedStatus } from 'src/app/models/autopilot';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DroneFlyingStatusesService extends GenericHttpClientService<DroneSummarizedStatus>{

  constructor(_http: HttpClient) { 
    super(_http);
    this.init(environment.services.drone_info)
  }

  public fetchAllFlyingStatuses(){
    return this.getAny<Map<string, DroneSummarizedStatus>>("drones/flying_status");
  }
  public fetchFlyingStatus(name: string){
    return this.get(`drones/${name}/flying_status`);
  }
}
