import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import { addTaskElements, PeriodicElement } from '../model/dataTable';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public url = environment.baseApi;

  constructor(private httpClint:HttpClient) { }

  listTasks(filter:any){
    let params = new HttpParams();
    Object.entries(filter).forEach(([key,val]: any) => {
      if(val){ // if val not undefined return this params
        params = params.append(key, val)
      }
    })
    return this.httpClint.get(`${this.url}/tasks`,{params})
  }

  addTasks(body:{}){
    return this.httpClint.post(`${this.url}/tasks`,body)
  }

  updateTasks(id:number,body:any){
    return this.httpClint.put<any>(`${this.url}/tasks/`+id,body)
  }

  deleteTask(id:number){
    return this.httpClint.delete<any>(`${this.url}/tasks/`+id)
  }
}
