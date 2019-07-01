import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MongoService {

    booksURI = "http://localhost:4000/books/";
    getFileURI = "http://localhost:4000/getfile/";

    constructor(private http: HttpClient) { }

    search(query: string): Observable<any> {
        return this.http.get(`${this.booksURI}` + query);
    }

    getPdf(name): Observable<any> {
        return this.http.get(`${this.getFileURI}` + name, { responseType: 'arraybuffer' })
            .pipe(map((res) => {
                return new Blob([res], { type: "application/pdf" });
            }));
    }
}