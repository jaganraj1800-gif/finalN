import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../../../services/employee';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-view',
  imports: [CommonModule],
  templateUrl: './employee-view.html',
  styleUrl: './employee-view.css',
})
export class EmployeeView implements OnInit {

  employee: any = {};

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') || '';

    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}