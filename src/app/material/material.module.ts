import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    DragDropModule
  ],
  exports:[
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    DragDropModule
  ]
})
export class MaterialModule { }
