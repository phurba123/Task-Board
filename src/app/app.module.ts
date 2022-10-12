import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TaskComponent } from './component/task/task.component';
import { AddTaskComponent } from './dialog/add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule} from '@angular/fire/compat'

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
