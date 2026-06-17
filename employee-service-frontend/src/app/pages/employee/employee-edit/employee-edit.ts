import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee';

@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css'
})
export class EmployeeEdit implements OnInit {

  employeeForm!: FormGroup;
  id!: string;
  transliterateTimeout: any;

  // ✅ Add designation list
  designationList = [
    'Software Engineer',
    'Senior Software Engineer',
    'Team Lead',
    'Manager',
    'System Analyst'
  ];

  // ✅ Add selected file
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.employeeForm = this.fb.group({
      employeeCode: ['', Validators.required],
      employeeNameEnglish: ['', Validators.required],
      employeeNameTamil: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      mobileNumber: [''],
      email: ['', Validators.email],
      remarks: ['']
    });

    this.loadEmployee();
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data: any) => {
        this.employeeForm.patchValue(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
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

  // ✅ Add file change method
  onFileChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected File:', this.selectedFile.name);
    }

  }

  updateEmployee(): void {

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService
      .updateEmployee(this.id, this.employeeForm.value)
      .subscribe({
        next: () => {
          alert('Employee updated successfully');
          this.router.navigate(['/employee/list']);
        },
        error: (err) => {
          console.error(err);
        }
      });

  }

}