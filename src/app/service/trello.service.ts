import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {
  private apiUrl='http://localhost:3000/trello';
  private api='http://localhost:3000/';

// trello , inprogress ,done
constructor(private httpclient: HttpClient) { }


   // Fetch all tasks from JSON server
   gettasks(): Observable<task[]> {
     const nameList="trello";
    return this.httpclient.get<task[]>(`${this.api}${nameList}`);
  }
  getInprogress(): Observable<task[]> {
     const nameList="inprogress";
    return this.httpclient.get<task[]>(`${this.api}${nameList}`);
  }
   getDone(): Observable<task[]> {
     const nameList="done";
    return this.httpclient.get<task[]>(`${this.api}${nameList}`);
  }

  // Add a new task to JSON server
  // addTask(newTask: task): Observable<task> {
  //   return this.httpclient.post<task>(`${this.apiUrl}`, newTask);
  // }
  // Add a new task to JSON server
  dargTask(newTask: task,nameList:string): Observable<task> {
    return this.httpclient.post<task>(`${this.api}${nameList}`, newTask);
  }

  // Update a task on JSON server
  updateTask(updatedTask: task): Observable<task> {
    const url = `${this.apiUrl}/${updatedTask.id}`;
    return this.httpclient.put<task>(url, updatedTask);
  }

  // Delete a task from JSON server
  deleteTask(id?: string,nameList?:string): Observable<task> {
    const url = `${this.api}${nameList}/${id}`;
    return this.httpclient.delete<task>(url);
  }

}
