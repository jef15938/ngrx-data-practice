import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo';
import { State, Store } from '@ngrx/store';
import { TodoService } from '../todo.service';
import { ChangeStateMap, ChangeType, EntityActionFactory, EntityOp, DefaultDataService, ofEntityType, ofEntityOp, MergeStrategy } from '@ngrx/data';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos$: Observable<Todo[]>

  constructor(
    private store: Store<Todo>,
    private todoService: TodoService,
    private entityActionFactory: EntityActionFactory
  ) {

  }

  ngOnInit(): void {
    // this.store.dispatch(TodosActions.loadTodos());
    this.fetchTodos();
    this.todos$ = this.todoService.entities$.pipe(tap(x => console.log('123', x)));

    // this.todoService.entityActions$.pipe(

    //   ofEntityType('Todo'),
    //   ofEntityOp(EntityOp.REMOVE_ALL),

    // ).subscribe(x => {
    //   this.onUndoAll();
    // });
  }

  onDeleteClickHandler(id: string): void {
    console.log('onDeleteClickHandler id: ', id);
    this.todoService.delete(id, { mergeStrategy: MergeStrategy.PreserveChanges }); // server

    // this.todoService.errors$.pipe(

    //   ofEntityType('Todo'),
    //   ofEntityOp(EntityOp.SAVE_DELETE_ONE_ERROR),

    //   map(x => x.payload.data.originalAction.payload.data),

    // ).subscribe(x => {
    //   const undo = this.entityActionFactory.create('Todo', EntityOp.UNDO_ONE, x);
    //   this.todoService.dispatch(undo);
    // });

  }

  fetchTodos() {
    // this.todoService.getAll(); // server
    this.todoService.getAll();
  }

  onRemoveAll() {

    const action = this.entityActionFactory.create<Todo>(
      'Todo',
      EntityOp.REMOVE_ALL,
      null,
      { tag: 'Load Heroes On Start' }
    );


    this.todoService.dispatch(action);


  }

  onUndoAll() {
    const action = this.entityActionFactory.create<Todo>(
      'Todo',
      EntityOp.UNDO_ALL,
      null,
      { tag: 'UNDO_ALL' }
    );


    this.todoService.dispatch(action);
  }
}
