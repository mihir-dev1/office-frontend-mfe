import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = environment.apiEndpoint;

  constructor(private http: HttpClient) { }


  ajaxCall<T>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    endpoint: string,
    data?: any,
    options: {
      headers?: HttpHeaders | { [header: string]: string | string[] },
      params?: HttpParams | { [param: string]: string | number | boolean }
    } = {}
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;

    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get<T>(url, options);

      case 'post':
        return this.http.post<T>(url, data, options);

      case 'put':
        return this.http.put<T>(url, data, options);

      case 'delete':
        return this.http.delete<T>(url, options);

      case 'patch':
        return this.http.patch<T>(url, data, options);

      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  customAPICall(url: string): Observable<any> {
    return this.http.get<any>('http://localhost:5000/'+url);
  }


}
