import { Component, OnInit }    from '@angular/core';
import { HttpService }          from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  tasks = [];
  hidden = '';
  newTask = {
    title: '',
    description: ''
  };

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getTasksFromService();
  }

  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe( (data) => {
      this.tasks = data.json().tasks;
    })
  }

  onSubmit($event) {
    $event.preventDefault();
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe();
    getTasksFromService();
    this.newTask = {
      title: '',
      description: ''
    };
  }

  // toggleHidden() {
  //   this.hidden == '<div>' ? this.hidden = '<div hidden>' : this.hidden = '<div>';
  //   // this.hidden = 'hidden'
  // }
}
