import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { PageObject } from './base/page-object';
import { Result } from './base/result';



import { BaseService } from './base/base.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { t_peoplefeature } from './t_peoplefeature';

@Injectable()
export class t_peoplefeatureService extends BaseService<t_peoplefeature>{

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

  searchPageGets(pageSize: number = 20, pageNo: number = 0, sex: number, status :number, contorltype :number, keywords :string, sort: string = 'id,desc'): Promise<PageObject<t_peoplefeature>> {
    // const sx = (sex && sex != null) ? `&sex=${sex}` : '&sex=-1';
    // const ss = (status && status != null) ? `&status=${status}` : '&status=-1';
    // const ce = (contorltype && contorltype != null) ? `&contorltype=${contorltype}` : '&contorltype=-1';
    const ks = (keywords && keywords !== '') ? `&keywords=${encodeURI(keywords)}` : '';
    // console.log(keywords);
    return this.httpc.get(this.url + `/searchList?pageSize=${pageSize}&pageNo=${pageNo}&sex=${sex}&status=${status}&contorltype=${contorltype}${ks}`)
      .toPromise()
      .then(response => {
        //console.log(response);
        let ret = response as Result<PageObject<t_peoplefeature>>;//让respnse 作为 Result<PageObject<T>> 类型，然后赋值给ret。let表示变量申明（var ）。
        //console.log(ret);
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  reloadData(): Promise<t_peoplefeature> {
    return this.httpc
      // .post(`${this.url}/addlist?file=${file}&filename=${filename}`, JSON.stringify(obj), {headers: this.headers})
      .get(`${this.url}/reload`)
      .toPromise()
      .then(response => {
        let ret = response as Result<t_peoplefeature>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  addlist(obj: t_peoplefeature): Promise<t_peoplefeature> {
    return this.httpc
      // .post(`${this.url}/addlist?file=${file}&filename=${filename}`, JSON.stringify(obj), {headers: this.headers})
      .post(`${this.url}/addlist`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<t_peoplefeature>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  edit(obj: t_peoplefeature): Promise<t_peoplefeature> {
    return this.httpc
      // .post(`${this.url}/addlist?file=${file}&filename=${filename}`, JSON.stringify(obj), {headers: this.headers})
      .post(`${this.url}/edit`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<t_peoplefeature>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  remove(obj: string): Promise<t_peoplefeature> {
    return this.httpc
      // .post(`${this.url}/addlist?file=${file}&filename=${filename}`, JSON.stringify(obj), {headers: this.headers})
      .get(`${this.url}/remove?ids=${obj}`)
      .toPromise()
      .then(response => {
        let ret = response as Result<t_peoplefeature>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }
}