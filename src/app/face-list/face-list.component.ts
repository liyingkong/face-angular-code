import { Component, OnInit } from '@angular/core';

import { MenuItem, LazyLoadEvent, SelectItem, Message, ConfirmationService } from 'primeng/primeng';

import { PageObject } from '../shared/base/page-object'
import { t_peoplefeature } from "../shared/t_peoplefeature";
import { t_peoplefeatureService } from "../shared/t_peoplefeature.service";
import { t_peoplecontroltypeService } from "../shared/t_peoplecontroltype.service";

import { MessageService } from 'primeng/components/common/messageservice';
import { Result } from '../shared/base/result';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'senlang-face-list',
  templateUrl: './face-list.component.html',
  styleUrls: ['./face-list.component.css'],
})
export class FaceListComponent implements OnInit {

  pageModel: PageObject<t_peoplefeature>;
  selectedModel: t_peoplefeature;
  model: t_peoplefeature = new t_peoplefeature();
  displayDialog: boolean;
  isNew: boolean;
  isShow: boolean = true;//false 展示input 

  uploadUrl: string;
  downloadUrl: string;

  t_peoplefeatures: t_peoplefeature[];
  selecteds: t_peoplefeature[];
  cols: any[];

  categories: SelectItem[];
  sex: SelectItem[];
  yesno: SelectItem[];
  environment
  uploadedFiles: any[] = [];
  private base64Image: string;
  img_file:File;

  search_sexs: SelectItem[];
  search_sex: number = -1;
  search_statuss: SelectItem[];
  search_status: number = -1;
  search_contorltypes: SelectItem[];
  search_contorltype: number = -1;
  keywords: string;
  select_contorltypes: SelectItem[];
  images: any[];
  constructor(
    private service: t_peoplefeatureService,
    private tpctService: t_peoplecontroltypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private domSanitizer: DomSanitizer,
  ) {

    this.search_sexs = [];
    this.search_sexs.push({ label: "全部", value: -1 });
    this.search_sexs.push({ label: '男', value: 1 });
    this.search_sexs.push({ label: '女', value: 0 });

    this.search_statuss = [];
    this.search_statuss.push({ label: "全部", value: -1 });
    this.search_statuss.push({ label: '生效', value: 1 });
    this.search_statuss.push({ label: '不生效', value: 0 });

    this.search_contorltypes = [];
    this.search_contorltypes.push({ label: "全部", value: -1 });
    this.select_contorltypes = [];
    this.select_contorltypes.push({ label: "请选择人员类别", value: null });
    this.tpctService.gets().then(t=>{
      t.forEach(c=>{
        this.search_contorltypes.push({ label: c.typename, value: c.contorltype });
        this.select_contorltypes.push({ label: c.typename, value: c.contorltype });
      });
    });
    
    this.sex = [];
    this.sex.push({ label: '男', value: 1 });
    this.sex.push({ label: '女', value: 0 });
    
    this.yesno = [];
    this.yesno.push({ label: '生效', value: 1 });
    this.yesno.push({ label: '不生效', value: 0 });

    //this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
  ngOnInit() {
    // this.images = [];
    // this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos1.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos1_small.jpg', title:'Sopranos 1'});
    this.refresh();
  }

  loadLazy(event: LazyLoadEvent) {
    this.refresh(event.rows, event.first / event.rows);
  }

  refresh(pageSize: number = 10, pageNo: number = 0) {
    console.log(environment.imgPath);
    // this.service.pageGets(pageSize, pageNo).then(c => {
    //   this.pageModel = c;
    //   this.pageModel.content.forEach( f => {
    //     f.picurl = environment.imgPath + f.picpath;
    //   })
    // })
    this.service.searchPageGets(pageSize, pageNo, this.search_sex, this.search_status , this.search_contorltype , this.keywords).then(c => {
      this.pageModel = c;
      this.pageModel.content.forEach( f => {
        this.search_contorltypes.forEach(c=>{
          if(c.value == f.contorltype){
            f.contorltype_name = c.label;
          }
        })
        f.picurl = environment.imgPath + f.picpath;
        f.images = [];
        f.images.push({source: f.picurl, thumbnail: f.picurl, title:f.name+"_"+f.businessid,});
      })
    })
    // console.log(this.pageModel);
  }

  // detail() {
  //   this.isShow = true;
  //   if (!this.selectedModel) {
  //     this.messageService.add({ severity: 'warn', detail: '请选择要查看的数据' });
  //     return;
  //   }
  //   this.displayDialog = true;
  // }

  add() {
    this.isNew = true;
    this.isShow = false;
    this.displayDialog = true;
    this.model = new t_peoplefeature();
  }

  update() {
    this.isNew = false;
    this.isShow = false;
    this.base64Image = null;
    if (this.selecteds == null || (this.selecteds && this.selecteds.length != 1)) {
      this.messageService.add({ severity: 'warn', detail: '请选择一条要修改的数据!' });
      return;
    }
    // this.uploadUrl = this.uploadService.getBatchUploadUrl() + "?type=gzzd-article&refCode=" + this.model.attachRefCode;
    this.model = this.selecteds[0];
    console.log(this.model);
    console.log(this.selecteds);
    this.displayDialog = true;
  }

  save() {
    if (this.isNew) {
      console.log(this.model);
      if (!this.model.name) {
        this.messageService.add({ severity: 'warn', detail: '请填写姓名!' });
        return;
      }
      if (this.model.sex == null) {
        this.messageService.add({ severity: 'warn', detail: '请选择性别!' });
        return;
      }
      if (!this.model.cardnumber) {
        this.messageService.add({ severity: 'warn', detail: '请填写身份证号!' });
        return;
      }
      if (!this.model.businessid) {
        this.messageService.add({ severity: 'warn', detail: '请填写唯一业务编号!' });
        return;
      }
      if (this.model.status == null) {
        this.messageService.add({ severity: 'warn', detail: '请选择人员状态!' });
        return;
      }
      if (!this.model.contorltype) {
        this.messageService.add({ severity: 'warn', detail: '请填写人员类别!' });
        return;
      }
      if (!this.img_file) {
        this.messageService.add({ severity: 'warn', detail: '请上传照片!' });
        return;
      }
      this.model.filename = this.img_file.name;
      // console.log();
      if(this.base64Image.split(";base64,").length<2){
        return;
      }
      this.model.file = this.base64Image.split(";base64,")[1];
      this.service.addlist(this.model).then(c => {
        this.messageService.add({ severity: 'success', detail: '数据添加成功' });
        //this.uploadService.update("article",c.)
        this.refresh();
      });
    }
    else {
      
      console.log(this.model);
      if (!this.model.name) {
        this.messageService.add({ severity: 'warn', detail: '请填写姓名!' });
        return;
      }
      if (this.model.sex == null) {
        this.messageService.add({ severity: 'warn', detail: '请选择性别!' });
        return;
      }
      if (!this.model.cardnumber) {
        this.messageService.add({ severity: 'warn', detail: '请填写身份证号!' });
        return;
      }
      // if (!this.model.businessid) {
      //   this.messageService.add({ severity: 'warn', detail: '请填写唯一业务编号!' });
      //   return;
      // }
      if (this.model.status == null) {
        this.messageService.add({ severity: 'warn', detail: '请选择人员状态!' });
        return;
      }
      if (!this.model.contorltype) {
        this.messageService.add({ severity: 'warn', detail: '请填写人员类别!' });
        return;
      }

      this.service.edit(this.model).then(c => {
        this.messageService.add({ severity: 'success', detail: '数据修改成功' });
        this.refresh();
      });
    }
    this.displayDialog = false;
    this.model = null;
    this.selecteds = null;
  }

  remove() {
    if (this.selecteds == null || (this.selecteds && this.selecteds.length < 1)) {
      this.messageService.add({ severity: 'warn', detail: '请选择要删除的数据' });
      return;
    }
    this.confirmationService.confirm({
      message: '确定要删除数据?删除后将无法恢复。',
      header: '删除确认',
      icon: 'fa fa-trash',
      accept: () => {
        var str = "";
        var len = this.selecteds.length;
        this.selecteds.forEach((v,i) => {
          if(i < len-1){
            str += v.id + ",";
          }else{
            str += v.id;
          }
        })
        console.log(str);
        this.service.remove(str).then(c => {
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

  search() {
    this.refresh();
  }

  onRowSelect(event) {
    this.model = this.cloneModel(event.data);
    console.log(this.model);
    // this.uploadService.list("gzzd-article", this.model.attachRefCode).then(v => {
    //   this.model.attachList = v;
    //   this.model.attachNumber = v.length;
    // })
  }

  // onUpload(event) {
  //   let xhr = event.xhr;
  //   if (xhr.response) {
  //     let result = JSON.parse(xhr.response) as Result<Upload[]>;
  //     console.log(result);
  //     console.log(result.errmsg);
  //     if (!this.model.attachList) {
  //       this.model.attachList = [];
  //     }
  //     this.model.attachList = this.model.attachList.concat(result.data);
  //     console.log(this.model.attachList);
  //   }
  // }

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

  // onUpload(event) {
  //   for(let file of event.files) {
  //       this.uploadedFiles = file;
  //   }
  //   console.log("imgPath = " + this.uploadedFiles.toString());
  //   console.log("哈哈哈哈");
  //   this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  // }

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
  }
}