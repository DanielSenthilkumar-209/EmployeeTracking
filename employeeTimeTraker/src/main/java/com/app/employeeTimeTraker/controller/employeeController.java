package com.app.employeeTimeTraker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.employeeTimeTraker.model.Employee;
import com.app.employeeTimeTraker.model.Task;
import com.app.employeeTimeTraker.service.EmployeeService;

@RestController
@CrossOrigin(origins="http://localhost:3000")

@RequestMapping("/emp")
public class employeeController {
	@Autowired
	private EmployeeService employeeService;
	
	
	
    @PostMapping("/add")
	public String addData(@RequestBody Employee employee) {
		 employeeService.addData(employee);
		 return "data added";
	}
	
    @PostMapping("/task")
  	public String addTask(@RequestBody Task task) {
  		 employeeService.addTask(task);
  		 return "data added";
  	}
  	

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Employee user) {
     List<Employee> isAuth = employeeService.authenticate(user.getEmployeeId(),user.getPassword());
        if(!isAuth.isEmpty()) {
        	String role = isAuth.get(0).getRole();
        	return ResponseEntity.ok(role);
        }else {
        	return ResponseEntity.ok("invalid");
        }
    }
    
    @GetMapping("/task/{id}")
    public List<Task> getTaskById(@PathVariable("id") String employeeId){
    	return employeeService.findByEmployeeId(employeeId);
    }
    
    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable("id") Integer id) {
    	return employeeService.deleteTask(id);
    }
    @PutMapping("/update/{id}")
    public String updateTask(@RequestBody Task task ,@PathVariable("id") Integer id) {
    	return employeeService.updateTask(id,task);
    }
}
