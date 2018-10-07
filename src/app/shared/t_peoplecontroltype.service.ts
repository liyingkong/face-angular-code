import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { BaseService } from './base/base.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { t_peoplecontroltype } from './t_peoplecontroltype';

@Injectable()
export class t_peoplecontroltypeService extends BaseService<t_peoplecontroltype>{

  //private headers = new Headers();
  protected url = environment.apiUrl + '/api/controltype';  // URL to web api
  // protected url = 'http://localhost:8804/';  // URL to web api

  //private token: string;
  protected headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private httpc: HttpClient,
    private messageSerivce: MessageService,
  ) {
    super(httpc, messageSerivce);
  }

}