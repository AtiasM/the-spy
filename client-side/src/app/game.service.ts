import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkPlace } from './entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getPlaces(){
    return this.http.get('/assets/work-places.json') as Observable<WorkPlace[]>
  }
}
