import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Task } from './task'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class TaskService {

	private todolistUrl = 'http://localhost:8080/todo';

	constructor(private http: HttpClient) { }

	getTasks(): Observable<Task[]> {
		return this.http.get<Task[]>(this.todolistUrl)
	}

	getTask(id: string): Observable<Task> {
		const url = `${this.todolistUrl}/${id}`;
		return this.http.get<Task>(url)
	}

	saveTask(task: Task): Observable<any> {
		const url = `${this.todolistUrl}/${task._id}`;
		return this.http.put<any>(url, {"name": task.name}, httpOptions)
	}

	createTask(task: Task): Observable<any> {
		return this.http.post<any>(this.todolistUrl, {"name": task.name}, httpOptions)
	}

	deleteTask(task: Task): Observable<any> {
		const url = `${this.todolistUrl}/${task._id}`;
		return this.http.delete<any>(url, httpOptions)
	}
}
