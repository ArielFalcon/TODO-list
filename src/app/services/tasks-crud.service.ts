import { Inject, Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {ITask} from "@/models/tasks.model";
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
  
  addTask(task: ITask) {
    return from(addDoc(collection(this.firestore, 'tasks'), task));
  }
}
