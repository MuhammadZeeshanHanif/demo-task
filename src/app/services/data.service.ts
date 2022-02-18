import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Brand } from '../models/brand';

@Injectable({providedIn: 'root'})

export class DataService {

  baseURL: string = "https://sample-nodetask.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }
  
  getBrands() {
    return this.httpClient.get(this.baseURL + "brand").pipe(map((res: any) => <Brand[]>res.data));
  }

  addBrand(payload: any) {
    return this.httpClient.post(this.baseURL + "brand", payload).pipe(map((res: any) => <Response>res));
  }

  editBrand(payload: any) {
    return this.httpClient.post(this.baseURL + "brand/update", payload).pipe(map((res: any) => <Response>res));
  }

  deleteBrand(payload: any) {
    return this.httpClient.post<Response>(this.baseURL + "brand/delete", payload);
  }
}
