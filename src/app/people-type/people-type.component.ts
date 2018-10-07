import { Component, OnInit } from '@angular/core';

import { MenuItem, LazyLoadEvent, SelectItem, Message, ConfirmationService } from 'primeng/primeng';

import { PageObject } from '../shared/base/page-object'

import { MessageService } from 'primeng/components/common/messageservice';

import { t_peoplecontroltype } from '../shared/t_peoplecontroltype';
import { t_peoplecontroltypeService } from '../shared/t_peoplecontroltype.service';
@Component({
  selector: 'senlang-people-type',
  templateUrl: './people-type.component.html',
  styleUrls: ['./people-type.component.css'],
})
export class PeopleTypeComponent implements OnInit {

  pageModel: PageObject<t_peoplecontroltype>;
  selectedModel: t_peoplecontroltype;
  model: t_peoplecontroltype = new t_peoplecontroltype();
  displayDialog: boolean;
  isNew: boolean;
  isShow: boolean = true;

  constructor(
    private service: t_peoplecontroltypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    //private orderService: OrderService,
  ) {
    //this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  ngOnInit() {
    this.refresh();
  }

  loadLazy(event: LazyLoadEvent) {
    this.refresh(event.rows, event.first / event.rows);
  }

  refresh(pageSize: number = 10, pageNo: number = 0) {
    this.service.pageGets(pageSize, pageNo).then(c => {
      this.pageModel = c;
      this.pageModel.content.forEach((v, i) => {
        // if (!v.organization) {
        //   this.commonService.org(v.orgId).then(b => {
        //     if (v) {
        //       v.organization = b;
        //     }
        //   });
        // }
        // if (!v.user) {
        //   this.commonService.user(v.openid).then(b => {
        //     if (v) {
        //       v.user = b;
        //     }
        //   });
        // }
      });
    })
  }

  detail() {
    this.isShow = true;
    if (!this.selectedModel) {
      this.messageService.add({ severity: 'warn', detail: '请选择要查看的数据' });
      return;
    }
    this.displayDialog = true;
  }

  add() {
    this.model = new t_peoplecontroltype();
    this.isNew = true;
    this.isShow = false;
    this.displayDialog = true;
  }

  update() {
    this.isNew = false;
    this.isShow = false;
    if (!this.selectedModel) {
      this.messageService.add({ severity: 'warn', detail: '请选择要修改的数据' });
      return;
    }
    this.displayDialog = true;
  }

  save() {
    if (this.isNew) {
      this.service.create(this.model).then(c => {
        this.messageService.add({ severity: 'success', detail: '数据添加成功' });
        this.refresh();
      });
    }
    else {
      this.service.update(this.model).then(c => {
        this.messageService.add({ severity: 'success', detail: '数据修改成功' });
        this.refresh();
      });
    }
    this.displayDialog = false;
    this.model = null;
    this.selectedModel = null;
  }

  delete() {
    if (!this.selectedModel) {
      this.messageService.add({ severity: 'warn', detail: '请选择要删除的数据' });
      return;
    }

    this.confirmationService.confirm({
      message: '确定要删除数据?删除后将无法恢复。',
      header: '删除确认',
      icon: 'fa fa-trash',
      accept: () => {
        let index = this.selectedModel.id;
        this.service.delete(index).then(c => {
          this.messageService.add({ severity: 'success', detail: '数据删除成功' });
          this.refresh();
        })
        this.model = null;
        this.displayDialog = false;
      },
      reject: () => {
      }
    });
  }

  onRowSelect(event) {
    this.model = this.cloneModel(event.data);
  }

  cloneModel(c: t_peoplecontroltype): t_peoplecontroltype {
    let o = new t_peoplecontroltype();
    for (let prop in c) {
      o[prop] = c[prop];
    }
    return o;
  }

  close() {
    this.model = null;
    this.displayDialog = false;
    this.selectedModel = null;
  }
}