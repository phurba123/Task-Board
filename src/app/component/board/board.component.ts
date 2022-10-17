import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent, TaskDialogResult } from '../../dialog/add-task/add-task.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private todoCollection : AngularFirestoreCollection<Task>;
  private inProgressCollection : AngularFirestoreCollection<Task>;
  private doneCollection : AngularFirestoreCollection<Task>;
  todo$ : Observable<Task[]>;
  inProgress$ : Observable <Task[]>;
  done$ : Observable<Task[]>;
  tempText?:string;
  // collectionArray:Array<Observable<Task[]>> =[];



  constructor( private _dialog : MatDialog, private readonly  _firestore : AngularFirestore) {
    this.todoCollection = _firestore.collection<Task>('todo');
    // console.log('this.todocollection : ', this.todoCollection)
    this.todo$ = getObservable(this.todoCollection);
    // console.log('todo$: ',this.todo$);
    // console.log('path : ', this.todoCollection.ref.path);

    this.inProgressCollection = _firestore.collection<Task>('inProgress');
    this.inProgress$ = getObservable(this.inProgressCollection)

    this.doneCollection = _firestore.collection<Task>('done');
    this.done$ = getObservable(this.doneCollection);
   }

  ngOnInit(): void {
  }

  editTask(list: 'todo'| 'inProgress'| 'done', task: Task): void
  {

    const dialogRef = this._dialog.open(AddTaskComponent, {
      width: '280px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {

      if (!result) {
        return;
      }

      if(result.delete) {
        this._firestore.collection(list).doc(task.id).delete()
      }
      else {
        this._firestore.firestore.collection(list).doc(task.id).update(task)
      }
    });
  }

  drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }

    const item = event.previousContainer.data[event.previousIndex];

    this._firestore.firestore.runTransaction(() => {
      const promises = Promise.all([
        this._firestore.firestore.collection(event.previousContainer.id).doc(item.id).delete(),
        this._firestore.firestore.collection(event.container.id).add(item)
      ]);
      return promises;
    })
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
        task : {},
        enableDelete: false
      },
    });

    addTaskDialogRef.afterClosed().subscribe((res : TaskDialogResult | undefined) =>{
      if(!res) {
        return;
      }
      this.todoCollection.add(res.task);
    })
  }

  identifyMe(index: any, item: any){
    return item.id; 
 }
}
