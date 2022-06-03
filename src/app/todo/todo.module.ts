import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoDomainHandler } from './todo.domain';
import { DomainHandler } from '../shared/domain.service';

@NgModule({
  declarations: [TodoComponent],
  exports: [TodoComponent],
  providers: [
    {
      provide: DomainHandler, useClass: TodoDomainHandler, multi: true
    }
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class TodoModule {}
