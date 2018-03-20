import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { ShintoService }     from '../../shinto.service';

@Component({
  selector: 'app-shinto-show',
  templateUrl: './shinto-show.component.html',
  styleUrls: ['./shinto-show.component.css']
})
export class ShintoShowComponent implements OnInit {
  ledger: [];
  constructor(
    private _shintoService: ShintoService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ledger = this._shintoService.ledger;
    let observable =this._route.params;
    observable.subscribe( (params) => {
      console.log(params['id']);
    })
  }

  findTransaction(id, ) {
    for ()
  }


}
