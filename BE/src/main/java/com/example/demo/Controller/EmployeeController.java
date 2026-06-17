package com.example.demo.Controller;
import java.util.List;
import com.example.demo.dto.EmployeeRequest;
import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/create")
    public ResponseEntity<Employee> createEmployee(
            @RequestBody EmployeeRequest request) {

        Employee employee = employeeService.createEmployee(request);

        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @GetMapping("/list")
public ResponseEntity<List<Employee>> getAllEmployees() {

    List<Employee> employees = employeeService.getAllEmployees();

    return ResponseEntity.ok(employees);
}

   @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable UUID id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/update/{id}")
public ResponseEntity<Employee> updateEmployee(
        @PathVariable UUID id,
        @RequestBody EmployeeRequest request) {

    Employee employee = employeeService.updateEmployee(id, request);

    return ResponseEntity.ok(employee);
}

@GetMapping("/report/{id}")
public ResponseEntity<byte[]> generateReport(
        @PathVariable UUID id) throws Exception {

    byte[] pdf = employeeService.generateEmployeeReport(id);

    return ResponseEntity.ok()
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=employee-report.pdf"
            )
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdf);
}
}