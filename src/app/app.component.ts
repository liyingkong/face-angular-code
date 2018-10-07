import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuModule, MenuItem } from 'primeng/primeng';

import { environment } from '../environments/environment'
import { t_peoplefeatureService } from './shared/t_peoplefeature.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];
  orgs: MenuItem[];

  constructor(
    private router: Router,
    private tpfService: t_peoplefeatureService,
  ) {
  }

  ngOnInit() {
    this.makeDefaultItems();
  }

  makeDefaultItems() {
    this.items = [];
    this.items = [
      { label: '操作手册', styleClass: 'menu-item', routerLink: ['index'] },
      { label: '人员类别', styleClass: 'menu-item', routerLink: ['people-type'] },
      { label: '人脸信息', styleClass: 'menu-item', routerLink: ['face-list'] },
      { label: '人脸搜索', styleClass: 'menu-item', routerLink: ['search-pro'] }
    ];
  }

  reloadData(){
    this.tpfService.reloadData().then( t=> {
      location.reload();
    });
    // this.makeDefaultItems();
  }
  
}
