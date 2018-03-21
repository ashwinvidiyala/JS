import { Component, OnInit } from '@angular/core';
import { AuthorService }     from '../../author.service';

@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.component.html',
  styleUrls: ['./author-show.component.css']
})
export class AuthorShowComponent implements OnInit {
  authors;

  constructor(private _authorService: AuthorService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    let observable = this._authorService.getAuthors();

    observable.subscribe( (data) => {
      this.authors = data.json().data;
    })
  }
}
