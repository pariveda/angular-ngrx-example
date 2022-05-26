import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { todoFeature } from './todo.reducer';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoComponent],
  exports: [TodoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(todoFeature),
  ],
})
export class TodoModule {}
