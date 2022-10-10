import { Component } from '@angular/core';
import { Task } from './component/task/task';
import { CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent, TaskDialogResult } from './dialog/add-task/add-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task board';

  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor( private _dialog : MatDialog)
  {}


  editTask(list: string, task: Task): void
  {
    console.log({method : 'editTask', list : list, task : task});
  }

  drop(event: CdkDragDrop<Task[]>): void {
    console.log('previous container : ', event.previousContainer);
    console.log('container : ', event.container)
    if (event.previousContainer === event.container) {
      console.log('if event.previousContainer === event.container')
      return;
    }
    
    if (!event.container.data || !event.previousContainer.data) {
      console.log('if !event.container.data || !event.previousContainer.data')
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  // new task addition
  newTask(): void {
    // open add task dialog for adding new task
    const addTaskDialogRef = this._dialog.open(AddTaskComponent, {
      width: "280px",
      data : {
        task : {}
      },
    });

    addTaskDialogRef.afterClosed().subscribe((res : TaskDialogResult | undefined) =>{
      console.log('res : ', res)
      if(!res) {
        console.log('no data returned : ', res);
        return;
      }

      this.todo.push(res.task)
    })
  }
}
