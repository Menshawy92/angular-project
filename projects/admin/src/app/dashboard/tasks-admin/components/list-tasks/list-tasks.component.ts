import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Subscription } from 'rxjs';
import { PeriodicElement } from '../../model/dataTable';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from "@ngx-translate/core";

const ELEMENT_DATA: PeriodicElement[] = [
  { status: 'Complete', title: 'Hydrogen', user: "1.0079", deadLineDate: "10-11-2022" },
  { status: 'In-Prossing', title: 'Helium', user: "4.0026", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Lithium', user: "6.941", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Beryllium', user: "9.0122", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Boron', user: "10.811", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Carbon', user: "12.010", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Nitrogen', user: "14.006", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Oxygen', user: "15.999", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Fluorine', user: "18.998", deadLineDate: "10-11-2022" },
  { status: 'Complete', title: 'Neon', user: "20.179", deadLineDate: "10-11-2022" },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit, OnDestroy {
  subscription = new Subscription()
  displayedColumns: string[] = ['position', 'title', 'user', 'deadLineDate', 'status', 'actions'];
  dataSource: PeriodicElement[] | any;
  @Input() realData: string | any;
  tasksFilter!: FormGroup;
  isLoggedUser: boolean = false;
  @Input() page: number = 1;
  filtration: any = {
    _page:this.page,
    _limit:20
  };
  users: any = [
    { name: "Mohamed", id: 1 },
    { name: "Ali", id: 2 },
    { name: this.translate.instant("task.name"), id: 3 },
    { name: "Zain", id: 4 },
  ]

  status: any = [
    { name: "Complete", id: 1 },
    { name: "In-Prossing", id: 2 },
  ]
  constructor(public dialog: MatDialog, private fb: FormBuilder, private serviceList: TasksService,private spinner:NgxSpinnerService,private translate: TranslateService) { }

  ngOnInit(): void {
    this.createform()
    this.getAllTasks();
    // this.serviceList.listTasks().subscribe((status:any) => {
    //   this.dataSource = status
    // })
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: ['', Validators.required],
      userId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    })
  }

  search(event: any) {
    this.page = 1;
    this.filtration['title'] = event.value
    this.getAllTasks()

  }

  selectedUser(event: any) {
    this.page = 1;
    this.filtration['user'] = event.value
    this.getAllTasks()
  }

  getAllTasks() {
    this.subscription.add(
      this.serviceList.listTasks(this.filtration).subscribe((res: any) => {
        this.dataSource = res
        
      })
    )
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks();
      }
    })
  }

  updateTask(element: number) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: { rowTask: element },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks();
      }
    })
  }

  deleteTask(id: number) {
    this.serviceList.deleteTask(id).subscribe(res => {
      console.log(res)
      this.getAllTasks();
    })
  }

  changePage(event:any){
    this.page = event;
    // this.filtration['_page'] = event
    this.getAllTasks()
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
