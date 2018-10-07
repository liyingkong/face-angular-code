import { Component } from '@angular/core';

import { StepsModule, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  items: MenuItem[];

  activeIndex: number = 0;

  stepContent:string = "";
  
  ngOnInit() {
    this.stepContent="支持上传、查看、修改、删除相关规章制度和办事流程。（备注：所有操作必须具备相应的权限）"
//     this.items = [
//       { label: '新品库 领用',command: (event: any) => {
//         this.activeIndex = 0;
//         this.stepContent = "采购、领用"
//     }
// },
//       { label: '在用库 统计' ,command: (event: any) => {
//         this.activeIndex = 1;
//         this.stepContent = "使用率、退回"
//     }},
//       { label: '二手库 再次使用',command: (event: any) => {
//         this.activeIndex = 2;
//         this.stepContent = "再次使用、报废"
//     } },
//       { label: '报废库 处置',command: (event: any) => {
//         this.activeIndex = 3;
//         this.stepContent = "处置、移除"
//     } },
//     ];
  }

}