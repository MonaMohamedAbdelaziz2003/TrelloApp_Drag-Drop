import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { task } from '../../model/task';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { TrelloService } from '../../service/trello.service';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TranslateModule,SpeedDialModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatIconModule,MatInputModule,ReactiveFormsModule,CdkDropListGroup,CommonModule, CdkDropList, CdkDrag],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})

export class TodoComponent implements OnInit,DoCheck {
       todoform!:FormGroup;
       tasks:task[]=[];
       improgress:task[]=[];
       done:task[]=[];
       isenable:boolean=false;
       updatedindex:any;
// /////////////
constructor(private fb:FormBuilder,public translate: TranslateService){    }

mode:any='';
examplelist='';

ngDoCheck(): void {
      const storedMode1 = localStorage.getItem('mode1');
      if(storedMode1){
        if(storedMode1=="light"){
        this.mode="backGroundLight";
        this.examplelist="example-list-light";
        }else{
          this.examplelist="example-list-dark";
          this.mode="backGroundDark";
        }
      }
      ///////// translate
      const lang=localStorage.getItem('lang');
      if(lang){
        this.translate.setDefaultLang(lang);
      }
  }

  // ////////////
       private trelloService=inject(TrelloService);
       ngOnInit(): void {
        this.todoform= this.fb.group({
          item:['',Validators.required]
        })
        this.loadTasks();
      }

      // newToDo: task = {} as task;
      // addtask(){
      //   this.tasks.push({
      //     title:this.todoform.value.item,
      //     completed:false,
      //   })
      //   this.todoform.reset();
      // }

      // updatetask(){
      //     this.tasks[this.updatedindex].title=this.todoform.value.item;
      //     this.tasks[this.updatedindex].completed=false;
      //     this.todoform.reset();
      //     this.updatedindex=undefined;
      //     this.isenable=false;
      // }

      // deletetskt(id:number){
      //     this.tasks.splice(id,1);
      // }

      // deleteImprogressTskt(id:number){
      //     this.improgress.splice(id,1);

      // }
      // deleteDoneTskt(id:number){
      //   this.done.splice(id,1);

      // }
      // ///////////////
      // onEditeTask(item:task,index:number){
      //   this.todoform.controls['item'].setValue(item.title);
      //   this.updatedindex=index;
      //   this.isenable=true;

      // }

      loadTasks() {
        // this.trelloService.gettasks().subscribe(tasks => {
        //   this.tasks = tasks.filter(task => !task.completed); // Filter tasks based on completion status
        //   this.improgress = tasks.filter(task => task.completed); // Separate completed tasks
        //   this.done = tasks.filter(task => task.completed); // You may want to handle 'done' tasks differently
        // });
        this.trelloService.gettasks().subscribe(tasks => {
          this.tasks = tasks.filter(task => !task.completed); // Filter tasks based on completion status
        });
        this.trelloService.getInprogress().subscribe(tasks => {
          this.improgress = tasks.filter(task => !task.completed); // Separate completed tasks
        });
        this.trelloService.getDone().subscribe(tasks => {
          this.done = tasks; // You may want to handle 'done' tasks differently
        });

      }
      newTask: task = {} as task;

      addtask() {
        if (this.todoform.valid) {
          const newTask={id:this.newTask.id,title:this.todoform.value.item,completed:false}
          this.newTask=newTask;
          this.trelloService.dargTask(newTask,"trello").subscribe(res => {
            this.tasks.push(res); // Update local tasks array with added task from server
            this.todoform.reset();
          });
        }
      }

      updatetask() {
        if (this.updatedindex !== undefined && this.todoform.valid) {
          this.tasks[this.updatedindex].title = this.todoform.value.item;
          this.tasks[this.updatedindex].completed = false;
          console.log("11",this.tasks[this.updatedindex]);
          this.trelloService.updateTask(this.tasks[this.updatedindex]).subscribe(() => {
            console.log("2",this.tasks[this.updatedindex]);
          });
          this.todoform.reset();
          this.updatedindex = undefined;
          this.isenable = false;
        }
      }

      deletetskt(id?: string,name?:string) {
        this.trelloService.deleteTask(id,name).subscribe(() => {
          if(name=="trello"){this.tasks = this.tasks.filter(task => task.id !== id);
          }else if(name=="inprogress"){this.improgress = this.improgress.filter(task => task.id !== id);
          }else{this.done = this.done.filter(task => task.id !== id);}
        });
      }


      onEditeTask(item: task, index: number) {
        this.todoform.controls['item'].setValue(item.title);
        this.updatedindex = index;
        this.isenable = true;
      }

      addto(newTask: task, nameList: string){
        this.trelloService.dargTask(newTask,nameList).subscribe(res => {
        })
      }

      drop(event: CdkDragDrop<task[]>, listName: string) {
        const previousContainerName= event.previousContainer.element.nativeElement.getAttribute('data-list-name')as string;
        const currentContainerName: string | null = event.container.element.nativeElement.getAttribute('data-list-name') as string;

        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
          const task =event.container.data[event.container.data.length-1];
          const newTask={id:task.id,title:task.title,completed:false}
          this.addto(newTask,currentContainerName);
          this.deletetskt(task.id,previousContainerName)
        }
      }
}
