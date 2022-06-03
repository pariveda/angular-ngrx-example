import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { DomainEffects, } from './domain.effects';
import { DefaultDomainHandler, DomainHandler, DomainService } from "./domain.service";
import { domainFeature } from './domain.feature';
import { EffectsModule } from '@ngrx/effects';
import { fetchFeature } from './fetch.feature';

@NgModule({
  declarations: [],
  providers: [DomainService, {
    provide: DomainHandler, useClass: DefaultDomainHandler, multi: true
  }],
  imports: [
    CommonModule,
    StoreModule.forFeature(domainFeature),
    StoreModule.forFeature(fetchFeature),
    EffectsModule.forFeature([DomainEffects]),
  ],
})
export class SharedModule {}
