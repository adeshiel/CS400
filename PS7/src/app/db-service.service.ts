import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  result;

  public newSearch(search: any){
    return this.http.post('http://localhost:4000/ps7/search', search).subscribe();
  }

  public newAPICall(){
    return this.http.get('http://localhost:4000/ps7/searched')

  }

  constructor(private http: HttpClient) {
  }
}
