import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzLayoutModule, NzMenuModule, NzIconModule } from 'ng-zorro-antd';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { RcaedaModule } from './rcaeda/rcaeda.module';
import { SettingModule } from './setting/setting.module';
import { AutoCommitModule } from './auto-commit/auto-commit.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    RcaedaModule,
    SettingModule,
    AutoCommitModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
