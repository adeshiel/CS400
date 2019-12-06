import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeachFormComponent } from './seach-form/seach-form.component';
import { TestComponent } from './test/test.component';
import { DbServiceService } from './db-service.service';

@NgModule({
  declarations: [
    AppComponent,
    SeachFormComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ DbServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
