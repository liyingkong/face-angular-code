import { Component, OnInit } from '@angular/core';

import { MenuItem, LazyLoadEvent, SelectItem, Message, ConfirmationService } from 'primeng/primeng';

import { PageObject } from '../shared/base/page-object'
import { DomSanitizer } from '@angular/platform-browser';
import { t_peoplecontroltypeService } from "../shared/t_peoplecontroltype.service";

import { MessageService } from 'primeng/components/common/messageservice';
import { t_peoplecontroltype } from '../shared/t_peoplecontroltype';
import { SearchProByImageService } from '../shared/image_file_search.service';
import { image_file_util } from '../shared/image_file_util';
import { t_peoplefeature } from '../shared/t_peoplefeature';

import { environment } from '../../environments/environment';

@Component({
  selector: 'senlang-search-pro',
  templateUrl: './search-pro.component.html',
  styleUrls: ['./search-pro.component.css'],
})
export class SearchProComponent implements OnInit {

  pageModel: t_peoplefeature[];
  selectedModel: t_peoplefeature;
  model: t_peoplefeature = new t_peoplefeature();
  displayDialog: boolean;
  isNew: boolean;
  isShow: boolean = true;
  base64Image: string = '';
  img_file:File;
  search_contorltypes: SelectItem[];

  image_file_model:image_file_util = new image_file_util();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private domSanitizer: DomSanitizer,
    private service: SearchProByImageService,
    private tpctService: t_peoplecontroltypeService,
  ) {
    //this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.search_contorltypes = [];
    this.tpctService.gets().then(t=>{
      t.forEach(c=>{
        this.search_contorltypes.push({ label: c.typename, value: c.contorltype });
      });
    });
  }

  ngOnInit() {
    // this.refresh();
  }

  loadLazy(event: LazyLoadEvent) {
    this.refresh();
  }

  refresh() {
    // console.log("this.refresh:");
    // console.log(this.base64Image);
    if(this.base64Image){
      // console.log("哈哈哈");
      this.image_file_model.file = this.base64Image.split(";base64,")[1];
    }else{
      this.messageService.add({ severity: 'warn', detail: '请上传要查找的人的照片' });
      return;
    }
    
    // console.log("哈哈哈123"+this.image_file_model);
    this.service.searchProByImage(this.image_file_model).then(c => {
      this.pageModel = c;
      if(c && c.length == 0){
        this.messageService.add({ severity: 'info', detail: '未搜索到相似人！' });
      }else{
        this.messageService.add({ severity: 'success', detail: '搜索到相似人！' });
      }
      if(this.pageModel){
        this.pageModel.forEach( f => {
          this.search_contorltypes.forEach(c=>{
            if(c.value == f.contorltype){
              f.contorltype_name = c.label;
            }
          })
          f.picurl = environment.imgPath + f.picpath;
          f.images = [];
          f.images.push({source: f.picurl, thumbnail: f.picurl, title:f.name+"_"+f.businessid,});
        })
      }
    })
    return 0;
  }

  detail() {
    this.isShow = true;
    if (!this.selectedModel) {
      this.messageService.add({ severity: 'warn', detail: '请选择要查看的数据' });
      return;
    }
    this.displayDialog = true;
  }

  // add() {
  //   this.model = new t_peoplecontroltype();
  //   this.isNew = true;
  //   this.isShow = false;
  //   this.displayDialog = true;
  // }

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
  }

  delete() {
    if (!this.selectedModel) {
      this.messageService.add({ severity: 'warn', detail: '请选择要删除的数据' });
      return;
    }


  }

  onRowSelect(event) {
    this.model = this.cloneModel(event.data);
  }

  cloneModel(c: t_peoplefeature): t_peoplefeature {
    let o = new t_peoplefeature();
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

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    this.img_file = file;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.base64Image = myReader.result.toString();
    }
    myReader.readAsDataURL(file);
    // console.log("readThis:");
    // console.log(this.base64Image);
    // this.refresh();
  }
}