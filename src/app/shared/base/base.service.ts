import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { MessageService } from 'primeng/components/common/messageservice';

import { PageObject } from './page-object';
import { Result } from './result';
import { iId } from './iid.interface';

export abstract class BaseService<T extends iId> {

  protected abstract url: string;
  protected abstract headers: HttpHeaders;
  private msgService: MessageService;
  private httpClient: HttpClient;
  //private token: string;

  constructor(
    http: HttpClient,
    msgService: MessageService,
  ) {
    this.msgService = msgService;
    this.httpClient = http;
  }

  pageGets(pageSize: number = 20, pageNo: number = 0, sort: string = 'id,desc'): Promise<PageObject<T>> {

    return this.httpClient.get(this.url + `/list?pageSize=${pageSize}&pageNo=${pageNo}`,{headers: this.headers})
      .toPromise()
      .then(response => {
        //console.log(response);
        let ret = response as Result<PageObject<T>>;//让respnse 作为 Result<PageObject<T>> 类型，然后赋值给ret。let表示变量申明（var ）。
        //console.log(ret);
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  pageSearchGets(search: string, pageSize: number = 100, pageNo: number = 0): Promise<PageObject<T>> {
    return this.httpClient.get(this.url + '/find?' + `search=${search}&pageSize=${pageSize}&pageNo=${pageNo}`,{headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<PageObject<T>>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  gets(): Promise<T[]> {

    return this.httpClient.get(`${this.url}/all`,{headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<T[]>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }


  get(id: number): Promise<T> {

    const url = `${this.url}/detail?id=${id}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(response => {
        let ret = response as Result<T>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  delete(id: number): Promise<boolean> {
    const url = `${this.url}/delete?id=${id}`;
    return this.httpClient.post(url,null,{headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<boolean>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  create(obj: T): Promise<T> {
    return this.httpClient
      .post(`${this.url}/create`, JSON.stringify(obj),{headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<T>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  update(obj: T): Promise<T> {
    const url = `${this.url}/update`;
    return this.httpClient
      .post(url, JSON.stringify(obj),{headers: this.headers})
      .toPromise()
      .then(response => {
        let ret = response as Result<T>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    if (this.msgService) {
      this.msgService.add({ severity: 'error', detail: error.errmsg || error.message || error });
    }
    return Promise.reject(error.errmsg || error.message || error);
  }
}
