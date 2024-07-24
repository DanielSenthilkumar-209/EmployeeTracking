package com.app.employeeTimeTraker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.app.employeeTimeTraker.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer>{


	 List<Employee> findByEmployeeIdAndPassword(String employeeId , String pasword);
}
