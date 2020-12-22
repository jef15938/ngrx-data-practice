import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { EntityActionFactory, EntityOp, MergeStrategy } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) { }

  todoForm: FormGroup = this.formBuilder.group({
    title: new FormControl('')
  })

  ngOnInit(): void {

  }

  onTodoFormSubmit() {
    let todo: Todo = {
      completed: false,
      id: new Date().getTime().toString(),
      title: this.todoForm.get('title').value
    };
    console.log('onTodoFormSubmit todo: ', todo);
    this.todoService.add(todo, { mergeStrategy: MergeStrategy.OverwriteChanges }); // server
    this.todoForm.reset();
  }
}
