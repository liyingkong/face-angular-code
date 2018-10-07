import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Result } from './base/result';
import { image_file_util } from './image_file_util';


import { BaseService } from './base/base.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { t_peoplefeature } from './t_peoplefeature';
import { PageObject } from './base/page-object';

@Injectable()
export class SearchProByImageService extends BaseService<image_file_util>{

  //private headers = new Headers();
  protected url = environment.apiUrl + '/api';  // URL to web api
  // protected url = 'http://localhost:8804/';  // URL to web api

  //private token: string;
  protected headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private httpc: HttpClient,
    private messageSerivce: MessageService,
  ) {
    super(httpc, messageSerivce);
  }

  searchProByImage(obj: image_file_util): Promise<t_peoplefeature[]> {
    return this.httpc
      // .post(`${this.url}/addlist?file=${file}&filename=${filename}`, JSON.stringify(obj), {headers: this.headers})
      .post(`${this.url}/SearchProByImage`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<t_peoplefeature[]>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }
}