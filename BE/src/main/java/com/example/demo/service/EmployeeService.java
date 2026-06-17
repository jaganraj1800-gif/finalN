package com.example.demo.service;

import com.example.demo.dto.EmployeeRequest;
import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfWriter;


@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee createEmployee(EmployeeRequest request) {

        if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new RuntimeException("Employee Code already exists");
        }

        Employee employee = new Employee();

        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setEmployeeNameEnglish(request.getEmployeeNameEnglish());
        employee.setEmployeeNameTamil(request.getEmployeeNameTamil());
        employee.setDesignation(request.getDesignation());
        employee.setDepartment(request.getDepartment());
        employee.setDateOfJoining(request.getDateOfJoining());
        employee.setMobileNumber(request.getMobileNumber());
        employee.setEmail(request.getEmail());
        employee.setRemarks(request.getRemarks());

        return employeeRepository.save(employee);
    }

      public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

   public Employee getEmployeeById(UUID id) {
    return employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
}

public Employee updateEmployee(UUID id, EmployeeRequest request) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

    employee.setEmployeeCode(request.getEmployeeCode());
    employee.setEmployeeNameEnglish(request.getEmployeeNameEnglish());
    employee.setEmployeeNameTamil(request.getEmployeeNameTamil());
    employee.setDesignation(request.getDesignation());
    employee.setDepartment(request.getDepartment());
    employee.setDateOfJoining(request.getDateOfJoining());
    employee.setMobileNumber(request.getMobileNumber());
    employee.setEmail(request.getEmail());
    employee.setRemarks(request.getRemarks());

    return employeeRepository.save(employee);
}

public byte[] generateEmployeeReport(UUID id) throws Exception {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

    ByteArrayOutputStream out = new ByteArrayOutputStream();

    Document document = new Document(PageSize.A4);
    PdfWriter.getInstance(document, out);

    document.open();

    byte[] fontBytes;
    try (InputStream fontStream = getClass().getClassLoader().getResourceAsStream("fonts/NotoSansTamil-VariableFont_wdth,wght.ttf")) {
        if (fontStream == null) {
            throw new RuntimeException("Font file 'fonts/NotoSansTamil-VariableFont_wdth,wght.ttf' not found in classpath resources!");
        }
        fontBytes = fontStream.readAllBytes();
    }

    BaseFont baseFont = BaseFont.createFont(
            "NotoSansTamil-VariableFont_wdth,wght.ttf",
            BaseFont.IDENTITY_H,
            BaseFont.EMBEDDED,
            true,
            fontBytes,
            null
    );

    Font titleFont = new Font(baseFont, 18, Font.BOLD);
    Font textFont = new Font(baseFont, 12);

    Paragraph title = new Paragraph(
            "Employee Service Record Report\nபணியாளர் சேவை வரலாறு அறிக்கை",
            titleFont
    );

    title.setAlignment(Element.ALIGN_CENTER);
    document.add(title);
    document.add(new Paragraph(" "));

    document.add(new Paragraph(
            "Employee Code : " + employee.getEmployeeCode(),
            textFont));

    document.add(new Paragraph(
            "Employee Name (English) : " + employee.getEmployeeNameEnglish(),
            textFont));

    document.add(new Paragraph(
            "Employee Name (Tamil) : " + employee.getEmployeeNameTamil(),
            textFont));

    document.add(new Paragraph(
            "Designation : " + employee.getDesignation(),
            textFont));

    document.add(new Paragraph(
            "Department : " + employee.getDepartment(),
            textFont));

    document.add(new Paragraph(
            "Date Of Joining : " + employee.getDateOfJoining(),
            textFont));

    document.add(new Paragraph(
            "Mobile Number : " + employee.getMobileNumber(),
            textFont));

    document.add(new Paragraph(
            "Email : " + employee.getEmail(),
            textFont));

    document.add(new Paragraph(
            "Remarks : " + employee.getRemarks(),
            textFont));

    document.close();

    return out.toByteArray();
}
}