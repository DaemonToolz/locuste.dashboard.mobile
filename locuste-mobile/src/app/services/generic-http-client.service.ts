import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpClientService<T> {
  private _endpoint: string;
  
  public onError: BehaviorSubject<Error> = new BehaviorSubject(null);;

  public init(endpoint: string) : void {
    this._endpoint = endpoint
  }

  constructor(private _http: HttpClient ) { }

  protected get(ressource: string): Observable<T>{
    // Ajouter authorizationheader
    return this._http.get<T>(`${this._endpoint}/${ressource}`).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<T>()
    }));
  }

  protected getArray(ressource: string): Observable<T[]>{
    // Ajouter authorizationheader
    return this._http.get<T[]>(`${this._endpoint}/${ressource}`).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<T[]>()
    }))
  }

  protected post<T>(ressource:string, body: T): Observable<any>{
    // Ajouter authorizationheader
    return this._http.post<T>(`${this._endpoint}/${ressource}`, body).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<any>()
    }));
  }

  protected postArray(ressource:string, body: any): Observable<T[]>{
    // Ajouter authorizationheader
    return this._http.post<T[]>(`${this._endpoint}/${ressource}`, body).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<T[]>()
    }))
  }

  protected put<T>(ressource:string, body: T): Observable<any>{
    // Ajouter authorizationheader
    return this._http.put<T>(`${this._endpoint}/${ressource}`, body).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<any>()
    }))
  }
  
  protected getPicture(ressource: string): Observable<any>{
    // Ajouter authorizationheader
    return this._http.get(`${this._endpoint}/${ressource}`,  { responseType: 'blob' }).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable()
    }))
  }

  
  protected getAny<A>(ressource: string): Observable<A>{
    // Ajouter authorizationheader
    return this._http.get<A>(`${this._endpoint}/${ressource}`).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<A>()
    }))
  }

  

  protected postAny<A>(ressource:string, body: any): Observable<A>{
    // Ajouter authorizationheader
    return this._http.post<A>(`${this._endpoint}/${ressource}`, body).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<A>()
    }))
  }

  protected putAny<A>(ressource:string, body: any): Observable<A>{
    // Ajouter authorizationheader
    return this._http.put<A>(`${this._endpoint}/${ressource}`, body).pipe(catchError((err : Error) => {
      this.onError.next(err);
      return new Observable<A>()
    }))
  }
}
