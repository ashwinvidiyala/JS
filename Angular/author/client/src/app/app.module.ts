import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AuthorService } from './author.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { AuthorShowComponent } from './author/author-show/author-show.component';
import { AuthorNewComponent } from './author/author-new/author-new.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AuthorShowComponent,
    AuthorNewComponent,
    AuthorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
