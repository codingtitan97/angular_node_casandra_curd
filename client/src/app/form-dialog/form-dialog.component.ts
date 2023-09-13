import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import * as Notiflix from 'notiflix';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  dataForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dataService: DataService
  ) {
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    });
  }
  ngOnInit(): void {
    if (this.data.action === 'update' || this.data.action === 'delete') {
      this.dataForm.patchValue({
        name: this.data.response.name,
        email: this.data.response.email
      })
    }
  }
  saveData(): void {
    const formData = this.dataForm.value;
    this.dialogRef.close(formData);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm() {
    let reqbody = {
      name: this.dataForm.value.name,
      email: this.dataForm.value.email
    }
    if (this.data.action == 'add') {
      Notiflix.Loading.circle();
      this.dataService.createData(reqbody).subscribe({
        next: (res: any) => {
          Notiflix.Loading.remove();
          console.log(res);
        },
        error: (err: any) => {
          Notiflix.Loading.remove();

        }
      })
    } else if (this.data.action == 'update') {
      Notiflix.Loading.circle();
      this.dataService.updateData(this.data.response.id, reqbody).subscribe({
        next: (res: any) => {
          Notiflix.Loading.remove();
          console.log(res);
        },
        error: (err: any) => {
          Notiflix.Loading.remove();

        }
      })
    } else {
      Notiflix.Loading.circle();
      this.dataService.deleteData(this.data.response.id).subscribe({
        next: (res: any) => {
          Notiflix.Loading.remove();
          console.log(res);
        },
        error: (err: any) => {
          Notiflix.Loading.remove();

        }
      })
    }
  }
}