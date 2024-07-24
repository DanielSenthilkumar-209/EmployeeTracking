package com.app.employeeTimeTraker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {
  
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private int id;
	 private String employeeId;
	 private String employeeName;
	 private String role;
	 private String project;
	 private String date;
	 private String startTime;
	 private String endTime;
	 private String taskCategory;
	 private String description;
	 private String myAssociate;
	 
	 
	 
	@Override
	public String toString() {
		return "Task [id=" + id + ", employeeName=" + employeeName + ", role=" + role + ", project=" + project
				+ ", date=" + date + ", startTime=" + startTime + ", endTime=" + endTime + ", taskCategory="
				+ taskCategory + ", description=" + description + ", myAssociate=" + myAssociate + "]";
	}
	public Task() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getTaskCategory() {
		return taskCategory;
	}
	public void setTaskCategory(String taskCategory) {
		this.taskCategory = taskCategory;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getMyAssociate() {
		return myAssociate;
	}
	public void setMyAssociate(String myAssociate) {
		this.myAssociate = myAssociate;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
}
