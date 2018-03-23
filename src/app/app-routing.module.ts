import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodolistComponent } from './todolist/todolist.component'
import { TaskDetailComponent } from './task-detail/task-detail.component'

const routes: Routes = [
  { path: '', component: TodolistComponent },
  { path: 'todo/:id', component: TaskDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}