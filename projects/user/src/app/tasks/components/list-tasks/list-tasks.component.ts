import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {status:'Complete' , title: 'Hydrogen', description: "1.0079", deadLineDate:"10-11-2022" },
  {status:'In-Prossing' , title: 'Helium', description: "4.0026", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Lithium', description: "6.941", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Beryllium', description: "9.0122", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Boron', description: "10.811", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Carbon', description: "12.010", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Nitrogen', description: "14.006", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Oxygen', description: "15.999", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Fluorine', description: "18.998", deadLineDate:"10-11-2022" },
  { status:'Complete' , title: 'Neon', description: "20.179", deadLineDate:"10-11-2022" },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource = ELEMENT_DATA;
  tasksFilter!:FormGroup;
  @Input() page: number = 1;
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(public dialog: MatDialog ,private fb:FormBuilder,private router: Router ) { }

  ngOnInit(): void {
    this.createform()
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }
  getAllTasks() {
    let token = JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGVsQGdtYWlsLmNvbSIsIm5hbWUiOiJtZW5zaGF3eSIsInBhc3MiOjE1MTYyMzkwMjJ9.Ha3E1ZkS5YvqFtrtvnZqJFscxqn1f_ax1eEZY5X2Gvo");
    let divideToken = JSON.parse(window.atob(token.split('.')[1]))
    console.log("divideToken",divideToken)
  }
  changePage(event:any){
    this.page = event;
    // this.filtration['_page'] = event
  }

}
