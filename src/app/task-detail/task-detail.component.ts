import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Task } from '../task'

import { TaskService } from '../task.service';

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
	@Input() task: Task;

	constructor(
		private route: ActivatedRoute,
		private taskService: TaskService,
		private router: Router) { }

	ngOnInit() {
		this.getHero();
	}

	getHero(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.taskService.getTask(id)
			.subscribe(task => this.task = task);
	}

	saveTask(): void {
		this.taskService.saveTask(this.task)
			.subscribe(() => this.router.navigate(['']))
	}

	deleteTask(): void {
		this.taskService.deleteTask(this.task)
			.subscribe(() => this.router.navigate(['']))
	}

	goBack(): void {
		this.router.navigate([''])
	}
}
