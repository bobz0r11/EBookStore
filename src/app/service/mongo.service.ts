import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MongoService {

    appURI = "http://localhost:4000/getfile/";

    constructor(private http: HttpClient) { }

    search(query: string): Observable<any> {
        console.log(`${this.appURI}` + query);
        this.http.get(`${this.appURI}` + query).subscribe(data => {
            console.log(data);
        });
        return this.http.get(`${this.appURI}` + query);
    }

}