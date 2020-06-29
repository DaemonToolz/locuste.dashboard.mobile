import { Injectable } from '@angular/core';
import { HelpMeModel, HelpSections } from 'src/app/models/help';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  public currentPage : HelpMeModel[] = []

  constructor(private _http: HttpClient) {

  }

  public loadDesiredSection(tabIndex: number){
    this.getHelpSection(HelpSections[tabIndex]).pipe(take(1)).subscribe(data => {
      this.currentPage = data.data;
    })
  }

  public getHelpSection(name: string): Observable<any>{
    return this._http.get<any>(`assets/internal_data/${name}.json`);
  }

}
