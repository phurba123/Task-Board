import { Component } from '@angular/core';
import { Task } from './component/task/task';
import { CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskBoard';

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
}
