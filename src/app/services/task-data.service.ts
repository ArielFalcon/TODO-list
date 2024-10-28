import {Injectable, WritableSignal} from '@angular/core';
import {ITask, ITaskDTO} from "@/models/tasks.model";

@Injectable({
	providedIn: 'root'
})
export class TaskDataService {
  private _task!: WritableSignal<ITask>;
	
	task(): ITask {
		return this._task();
	}
	
	setTask(value: ITaskDTO) {
		this._task.set(value as ITask);
	}
}
