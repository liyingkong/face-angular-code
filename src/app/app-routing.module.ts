import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from "./index/index.component"
import { FaceListComponent } from "./face-list/face-list.component"
import { PeopleTypeComponent } from "./people-type/people-type.component"
import { SearchProComponent } from './search-pro/search-pro.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent },
  { path: 'face-list', component: FaceListComponent },
  { path: 'people-type', component: PeopleTypeComponent },
  { path: 'search-pro', component: SearchProComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
