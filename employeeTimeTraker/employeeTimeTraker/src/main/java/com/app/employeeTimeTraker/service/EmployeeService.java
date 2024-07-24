package com.app.employeeTimeTraker.service;


import java.util.*;

import com.app.employeeTimeTraker.model.Employee;
import com.app.employeeTimeTraker.model.Task;

public interface EmployeeService {
    
public abstract Employee addData(Employee employee);

public abstract Task addTask(Task task);



public abstract List<Employee> authenticate(String employeeId, String password);

public abstract List<Task> findByEmployeeId(String employeeId);

public abstract String deleteTask(Integer id);


 public abstract String updateTask(Integer id, Task task);
}
