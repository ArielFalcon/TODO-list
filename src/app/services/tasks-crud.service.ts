import { Inject, Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from "@angular/fire/firestore";
import {ITaskDTO} from "@/models/tasks.model";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksCrudService {
  constructor(@Inject(Firestore) private firestore: Firestore) {}
  
  private get getCollection() {
    return collection(this.firestore, 'tasks');
  }
  
  public getCollectionData() {
    return collectionData(this.getCollection, { idField: 'id' });
  }
  
  addTask(task: ITaskDTO) {
    return from(addDoc(this.getCollection, task));
  }
  
  updateTask(id: string, task: ITaskDTO) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return from(updateDoc(taskDoc, {task}));
  }
  
  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return from(deleteDoc(taskDoc));
  }
}
