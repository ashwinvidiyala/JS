import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class AuthorService {

  constructor(private _http: Http) { }

  getAuthors() {
    return this._http.get('/authors');
  }

  addAuthor(author) {
    return this._http.post('/authors', author);
  }

  getAuthor(id) {
    return this._http.get(`/authors/${id}`);
  }

  editAuthor(id, author) {
    return this._http.put(`/authors/${id}`, author);
  }
}
