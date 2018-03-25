import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task'

import { TaskService } from '../task.service'

@Component({
	selector: 'app-todolist',
	templateUrl: './todolist.component.html',
	styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
	tasks: Task[];
	task: Task;

	constructor(
		private taskService: TaskService,
		private router: Router) { 
		this.task = new Task();
	}

	ngOnInit() {
		this.getTasks();
	}

	getTasks(): void {
		this.taskService.getTasks()
			.subscribe(tasks => this.tasks = tasks.reverse());
	}

	createTask(): void {
		if (!this.task.name) return
		this.taskService.createTask(this.task)
			.subscribe(() => this.getTasks())
	}
}
