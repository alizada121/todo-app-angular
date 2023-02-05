import { Component,OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObj:Task=new Task()
  taskArr:Task[]=[];

  editTaskValue:string='';
  addTaskValue:string='';
  constructor(private crudService:CrudService){}

  ngOnInit(): void {
    this.taskObj=new Task();
    this.taskArr=[];
    this.getAllTask();
    this.editTask();
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(res=>{
        this.taskArr=res;
    },err=>{
      alert("Unable to get the list")
    })
  }


  addTask(){
    console.log("girdi")
    
    this.taskObj.task_name=this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next:()=>{this.ngOnInit()
      this.addTaskValue=''
      console.log(this.taskArr)},
      // error:()=>{alert("error")},    
    })
  }

//   res=>{
//     this.ngOnInit();
//     this.addTaskValue=''
// },err=>{
//   alert(err)
// })

  editTask(){
    this.taskObj.task_name=this.editTaskValue
    this.crudService.editTask(this.taskObj).subscribe({
      next:()=>{this.ngOnInit()
      this.editTaskValue=''
      console.log(this.taskArr)},
      error:()=>{alert("error")},    
    })
  }

  deleteTask(etask:Task){
    this.crudService.DeleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Failed")
    })

  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }


}
