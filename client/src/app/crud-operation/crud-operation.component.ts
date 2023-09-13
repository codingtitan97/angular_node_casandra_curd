import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-operation',
  templateUrl: './crud-operation.component.html',
  styleUrls: ['./crud-operation.component.css']
})
export class CrudOperationComponent implements OnInit {
  dataList: any = [];
  dataForm!: FormGroup;
  current_item: any;
  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.dataService.getAllData()
      .subscribe({
        next: (res) => {
          this.dataList = res;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }
  createData(data: any): void {
    this.dataService.createData(data)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  updateData(data: any): void {
    let id = ''
    this.dataService.updateData(id, data)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: {
        action: action,
        response: this.current_item
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }
  update(item: any) {
    this.current_item = item;
  }
}
