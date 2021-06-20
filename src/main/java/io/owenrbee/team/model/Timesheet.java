package io.owenrbee.team.model;

import java.util.Date;

public class Timesheet {
	
	private int row;
	private String productTicket;
	private String supportTicket;
	private String customer;
	private String summary;
	private String activity;
	private String category;
	private Date date;
	private Float regHours;
	private Float vaHours;
	private Float otHours;
	private String status;
	private String remarks;
	
	public String getProductTicket() {
		return productTicket;
	}
	public void setProductTicket(String productTicket) {
		this.productTicket = productTicket;
	}
	public String getSupportTicket() {
		return supportTicket;
	}
	public void setSupportTicket(String supportTicket) {
		this.supportTicket = supportTicket;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getActivity() {
		return activity;
	}
	public void setActivity(String activity) {
		this.activity = activity;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Float getRegHours() {
		return regHours;
	}
	public void setRegHours(Float regHours) {
		this.regHours = regHours;
	}
	public Float getVaHours() {
		return vaHours;
	}
	public void setVaHours(Float vaHours) {
		this.vaHours = vaHours;
	}
	public Float getOtHours() {
		return otHours;
	}
	public void setOtHours(Float otHours) {
		this.otHours = otHours;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}

}
