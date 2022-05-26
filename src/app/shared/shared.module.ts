import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FetchService } from './fetch.service';
import { fetchFeature } from './fetch.reducer';

@NgModule({
  declarations: [],
  providers: [FetchService],
  imports: [
    CommonModule,
    StoreModule.forFeature(fetchFeature),
  ],
})
export class SharedModule {}
