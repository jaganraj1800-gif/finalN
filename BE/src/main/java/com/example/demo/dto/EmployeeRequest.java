package com.example.demo.dto;

import java.time.LocalDate;

public class EmployeeRequest {

    private String employeeCode;
    private String employeeNameEnglish;
    private String employeeNameTamil;
    private String designation;
    private String department;
    private LocalDate dateOfJoining;
    private String mobileNumber;
    private String email;
    private String remarks;

    public EmployeeRequest() {
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getEmployeeNameEnglish() {
        return employeeNameEnglish;
    }

    public void setEmployeeNameEnglish(String employeeNameEnglish) {
        this.employeeNameEnglish = employeeNameEnglish;
    }

    public String getEmployeeNameTamil() {
        return employeeNameTamil;
    }

    public void setEmployeeNameTamil(String employeeNameTamil) {
        this.employeeNameTamil = employeeNameTamil;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}