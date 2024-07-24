package com.app.employeeTimeTraker.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.employeeTimeTraker.model.Employee;
import com.app.employeeTimeTraker.model.Task;
import com.app.employeeTimeTraker.repository.EmployeeRepository;
import com.app.employeeTimeTraker.repository.TaskRepository;
@Service
public class EmployeeServiceImpl implements EmployeeService{
   
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private TaskRepository taskRepository;
	
	@Override
	public Employee addData(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public Task addTask(Task task) {
		return taskRepository.save(task);
		
	}

	@Override
	public List<Employee> authenticate(String employeeId, String password) {
		// TODO Auto-generated method stub
		List<Employee> e = employeeRepository.findByEmployeeIdAndPassword(employeeId,password);
		return e;
	}

	@Override
	public List<Task> findByEmployeeId(String employeeId) {
		return taskRepository.findByEmployeeId(employeeId);
	}

	@Override
	public String deleteTask(Integer id) {
		// TODO Auto-generated method stub
		taskRepository.deleteById(id);
		return "deletd";
	}

	@Override
	public String updateTask(Integer id , Task task) {
		Optional<Task> t = taskRepository.findById(id);
		if(t.isPresent()) {
			Task ta = t.get();
			 ta.setEmployeeName(task.getEmployeeName());
			 taskRepository.save(ta);
			 return "updated";
		}
		   
		return "2";
	}

	}
