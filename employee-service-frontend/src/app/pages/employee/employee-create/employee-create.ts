import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { EmployeeService } from '../../../services/employee';
import { Router } from '@angular/router';



@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-create.html',
  styleUrls: ['./employee-create.css']
})
export class EmployeeCreate {

  employeeForm: FormGroup;
  transliterateTimeout: any;

  designationList = [
    'Software Engineer',
    'Senior Software Engineer',
    'Team Lead',
    'Manager',
    'System Analyst'
  ];

  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {

    this.employeeForm = this.fb.group({
      employeeNameEnglish: ['', Validators.required],
      employeeNameTamil: ['', Validators.required],
      employeeCode: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.pattern(/^[0-9]{10}$/)]
      ],
      email: ['', Validators.email],
      remarks: ['']
    });

  }

  transliterateTamil(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/[a-zA-Z]/.test(value)) {
      return;
    }

    if (this.transliterateTimeout) {
      clearTimeout(this.transliterateTimeout);
    }

    this.transliterateTimeout = setTimeout(() => {
      this.employeeService.transliterateToTamil(value).subscribe({
        next: (tamilText: string) => {
          if (tamilText) {
            this.employeeForm.patchValue({
              employeeNameTamil: tamilText
            }, { emitEvent: false });
            input.value = tamilText;
          }
        },
        error: (err) => console.error('Transliteration failed:', err)
      });
    }, 500);
  }

  onTamilBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/[a-zA-Z]/.test(value)) {
      return;
    }

    if (this.transliterateTimeout) {
      clearTimeout(this.transliterateTimeout);
    }

    this.employeeService.transliterateToTamil(value).subscribe({
      next: (tamilText: string) => {
        if (tamilText) {
          this.employeeForm.patchValue({
            employeeNameTamil: tamilText
          }, { emitEvent: false });
          input.value = tamilText;
        }
      }
    });
  }

  onFileChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      input.value = '';
      return;
    }

    this.selectedFile = file;
  }

saveEmployee(): void {

  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  console.log('Sending payload:', this.employeeForm.value);

  this.employeeService.createEmployee(this.employeeForm.value)
    .subscribe({
      next: (response) => {
        console.log('Success:', response);

        alert('Employee created successfully');

        this.router.navigate(['/employee/list']);
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
}

  reset(): void {
    this.employeeForm.reset();
  }

}