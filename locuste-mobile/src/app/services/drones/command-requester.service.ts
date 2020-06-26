import { Injectable } from '@angular/core';
import { GenericHttpClientService } from '../generic-http-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ManualCommandRequest, AutomatedCommandRequest } from 'src/app/models/commands';

@Injectable({
  providedIn: 'root'
})
export class CommandRequesterService extends GenericHttpClientService<any> {

  constructor(_http: HttpClient) {
    super(_http);
    this.init(environment.services.drone_info); 
  }

  public sendCommand(droneName: string, myCommand: ManualCommandRequest) : Observable<any>{
    return this.post("command", {target: droneName, command: myCommand} );
  }

  public sendAutomatedCommand(droneName: string, myCommand: AutomatedCommandRequest) : Observable<any>{
    return this.get(`drone/${droneName}/${myCommand}`);
  }
}
