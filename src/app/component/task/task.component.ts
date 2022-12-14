import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../model/task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {

  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();

  constructor() { }
  ngOnInit(): void {
  }

}
