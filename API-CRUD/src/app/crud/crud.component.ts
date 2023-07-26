import { Component, OnInit } from '@angular/core';
import { WCFService } from '../services/wcf.service';
import { Customer } from '../interfaces/customer';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit{

  constructor(private wfcService:WCFService, private formBuilder: FormBuilder) { }

  customerList : Customer[] = [];

  id!:number;

  formCustomer !: FormGroup;

  newC:Customer={
    id:0,
    age:0,
    email:'',
    name:''
  };

  _listFilter = '';
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
    }

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  selectRow!:number;

  ngOnInit(): void {
    this.obtenerLista();

    this.listFilter = '';
    this.formCustomer = this.formBuilder.group({
      name:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      age:['',[Validators.required,Validators.pattern("^[0-9]+$")]],
      email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]]
    });
  }

  obtenerPorId(id:string){
    this.wfcService.getById(parseInt(id)).subscribe(
      resp => {
        this.customerList = []
        this.customerList.push(resp.response)
      },
      (error: HttpErrorResponse) => {
        this.customerList = []
      }
    )
  }

  obtenerLista(){
    this.wfcService.getList().subscribe(
      resp => {
        this.customerList = resp.response
      }
    )
  }

  saveId(c:number, i:number){
    this.id = c;
    this.selectRow = i;
  }

  deleteCustomer(){
    this.wfcService.deleteCustomer(this.id).subscribe(
      resp => {
        console.log(resp)
        this.obtenerLista()
      }
    )
  }

  borrarFiltro(){
    this.listFilter = '';
    this.obtenerLista();
  }

  editCustomer(c:Customer){

    this.formCustomer.setValue({
      name: c.name,
      age: c.age,
      email: c.email
    })

    this.newC = {
      name: c.name,
      age: c.age,
      id: c.id,
      email: c.email
    }
    console.log(this.newC);
  }

  saveBD(){
    console.log(this.newC);
    if(this.newC.id == 0){
      this.newC = {
        name: this.formCustomer.get('name')?.value,
        email: this.formCustomer.get('email')?.value,
        age: this.formCustomer.get('age')?.value,
        id: 0
      }

      this.wfcService.saveCustomer(this.newC).subscribe(
        resp => {
          if(resp.message == "ok"){
            this.nuevo();
            this.obtenerLista();
          }
          console.log(this.newC);
        }
      )
    }else{
      this.newC = {
        name: this.formCustomer.get('name')?.value,
        email: this.formCustomer.get('email')?.value,
        age: this.formCustomer.get('age')?.value,
        id: this.newC.id
      }

      this.wfcService.editCustomer(this.newC).subscribe(
        resp => {
          if(resp.message == "ok"){
            this.nuevo();
            this.obtenerLista();
          }
          console.log(this.newC);
        }
      )
    }

  }

  hayRegistros(){
    return this.customerList.length>0;
  }

  nuevo(){
    this.newC = {
      name: '',
      email: '',
      age: 0,
      id: 0
    };

    this.formCustomer.reset();

    this.id = 0;
    this.selectRow = -1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
