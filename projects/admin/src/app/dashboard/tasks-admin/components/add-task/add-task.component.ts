import { Component, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ConfirmPopupComponent } from 'projects/admin/src/app/shared/confirm-popup/confirm-popup.component';
import { Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  subscription = new Subscription();
  addForm: FormGroup | any;
  fileName!: "";
  changed = false;
  imageUpload: FileList | any;
  taskID: number | any;
  title: string | any;
  isEditMode : boolean | any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialog: MatDialogRef<AddTaskComponent>, public matDialog: MatDialog, private serviceList: TasksService) { 
  }

  users: any = [
    { name: "Moahmed", id: 1 },
    { name: "Ali", id: 2 },
    { name: "Ahmed", id: 3 },
    { name: "Zain", id: 4 },
  ]
  ngOnInit(): void {
    this.getForm();
    // this.handelUpdateTask()
    this.isEditMode = false;
  }

  getForm() {
    this.addForm = this.fb.group({
      title: [this.data?.rowTask.title||'', Validators.required],
      user: [this.data?.rowTask.user || '', Validators.required],
      // Image: ['', Validators.required],
      formDate: [this.data ? new Date(this.data.rowTask.formDate.split('-').reverse().join('-')).toISOString() : '', Validators.required],
      description: [this.data?.rowTask.description || '', Validators.required],
    })
  }

  getData() {
    // let model = this.prepareFormData();
    let data = {
      ...this.addForm.value,
      formDate: moment(this.addForm.value['formDate']).format('DD-MM-YYYY')
    }
    this.subscription.add(
      this.serviceList.addTasks(data as {}).subscribe(res => {
        this.dialog.close(res)
       
      })
    )
  }

  getImageName(event: any) {
    this.fileName = event.target.files[0].name
    // this.imageUpload = event.target.files[0]
    this.addForm.get("Image")?.setValue(event.target.files[0])
  }

  prepareFormData() {
    let formData: any = new FormData()
    Object.entries(this.addForm.value).forEach(([key, val]: any) => {
      formData.append(key, val)
    })
    return formData
  }

  closeDialog() {
    if (this.addForm.dirty) {
      const dialogRef = this.matDialog.open(ConfirmPopupComponent, {
        width: '750px',
        data: {
          description: 'Are you sure close this window?',
          cancelBtn: 'Cancel',
          confirmBtn: "Continue"
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dialog.close()
        }
      });
    } else {
      this.dialog.close()
    }
  }

  // handelUpdateTask() {
  //   this.isEditMode = true;
  //   this.taskID = this.data.rowTask
  //   this.addForm.get("Image")?.setValue(this.data.rowTask.Image)
  //   this.addForm.get("user")?.setValue(this.data.rowTask.user)
  //   this.addForm.get("title")?.setValue(this.data.rowTask.title)
  //   this.addForm.get("formDate")?.setValue(new Date(this.data.rowTask.formDate.split('-').reverse().join('-')).toISOString())
  //   this.addForm.get("description")?.setValue(this.data.rowTask.description)
  // }

  getUpdate(){
    this.taskID = this.data.rowTask.id
    console.log(" this.taskID ", this.taskID )
    let data = {
      ...this.addForm.value,
      formDate: moment(this.addForm.value['formDate']).format('DD-MM-YYYY')
    }
    this.subscription.add(
      this.serviceList.updateTasks(this.taskID,data as {}).subscribe(res => {
       console.log("res",res)
        this.dialog.close(res)
      })
    )
  }

}
