import { Injectable } from '@angular/core';
import { GenericHttpClientService } from '../generic-http-client.service';
import { DroneSettings } from 'src/app/models/drone';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DroneSettingsService extends GenericHttpClientService<DroneSettings> {
  public droneSettings : Map<string, DroneSettings> = new Map();
  
  constructor(_http: HttpClient) { 
    super(_http)
    this.init(environment.services.drone_info); 
    this.fetchAllSettings();
  }

  public updateSettings(input: DroneSettings){
    this.droneSettings.set(input.drone_name, input);
    this.post<any>("drone/settings/controls", input).pipe(take(1)).subscribe()
  }

  public fetchAllSettings(){
    this.getAny<any>("drone/settings/controls").pipe(take(1)).subscribe(results => {
      this.droneSettings = new Map(Object.entries(results))
    })
  }

  public fetchSettings(input: string){
    this.getAny<any>(`drone/${input}/settings/controls`).pipe(take(1)).subscribe(result => {
      this.droneSettings.set(input, result)
    })
  }
}
