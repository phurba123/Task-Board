import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from 'src/app/component/task/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    private _dialogRef : MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
    )
  { }

  ngOnInit(): void {
  }

  cancel(): void {
    console.log('this.data : ',this.data);
    console.log('this.backupdata : ', this.backupTask)
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this._dialogRef.close(this.data);
  }

}

// Interfaces for task dialog data and task dialog result,
// if we are getting enableDeleted as true then display delete button aswell for deleting task
export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
