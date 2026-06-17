import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  employees: any[] = [];
  searchQuery: string = '';

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  get filteredEmployees(): any[] {
    if (!this.searchQuery.trim()) {
      return this.employees;
    }
    const query = this.searchQuery.toLowerCase().trim();
    return this.employees.filter(emp =>
      String(emp.employeeCode || '').toLowerCase().includes(query) ||
      String(emp.employeeNameEnglish || '').toLowerCase().includes(query) ||
      String(emp.employeeNameTamil || '').toLowerCase().includes(query)
    );
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: any[]) => {
        console.log('API Response:', response);
        this.employees = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  downloadPdf(id: string): void {

    this.employeeService.downloadReport(id).subscribe({
      next: (blob: Blob) => {

        const fileURL = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `employee-report-${id}.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(fileURL);
      },
      error: (error) => {
        console.error('PDF download failed:', error);
        alert('Failed to download employee report.');
      }
    });

  }
}