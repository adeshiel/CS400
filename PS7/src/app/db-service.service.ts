import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  public newSearch(search: any){
    return this.http.post('http://localhost:27017/searches', search);
  }

  constructor(private http: HttpClient) { }
}
