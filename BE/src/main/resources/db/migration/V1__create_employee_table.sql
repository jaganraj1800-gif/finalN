CREATE TABLE employees (

    id BIGSERIAL PRIMARY KEY,

    employee_code VARCHAR(50) NOT NULL UNIQUE,

    employee_name_english VARCHAR(255) NOT NULL,

    employee_name_tamil VARCHAR(255) NOT NULL,

    designation VARCHAR(100) NOT NULL,

    department VARCHAR(100) NOT NULL,

    date_of_joining DATE NOT NULL,

    mobile_number VARCHAR(10),

    email VARCHAR(255),

    remarks TEXT,

    appointment_order_path VARCHAR(500),

    created_date TIMESTAMP NOT NULL,

    updated_date TIMESTAMP NOT NULL

);