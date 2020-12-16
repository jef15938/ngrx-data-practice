import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultDataService, DefaultDataServiceConfig, EntityDataModule, HttpUrlGenerator } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TodosComponent } from './todos/todos.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://a21237e2-c6ce-4b1e-bc9c-c62692718984.mock.pstmn.io/',
  delete404OK: false
}

@NgModule({
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  declarations: [
    AppComponent,
    TodosComponent,
    NewTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
