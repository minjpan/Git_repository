package egovframework.example.sample.vo;

import java.util.Date;

import egovframework.example.sample.service.SampleDefaultVO;

public class FacilityVO extends SampleDefaultVO {

	private static final long serialVersionUID = 1L;
	
	private int facilityId;
	private int partId;
	private int statusId;
	private int cnt;
	
	private String stsName;
	private String stsNameId;
	
	private String facilityName;
	private String statusName;
	
	private String locationArea;
	
	private String sensorName;
	private int sensorValue;
	
	private String locationData;
	private int energyAmount;
	
	private String  srtDate;
	private String endDate;
	
	public int getFacilityId() {
		return facilityId;
	}
	public void setFacilityId(int facilityId) {
		this.facilityId = facilityId;
	}
	public String getFacilityName() {
		return facilityName;
	}
	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}
	public int getPartId() {
		return partId;
	}
	public void setPartId(int partId) {
		this.partId = partId;
	}
	public int getStatusId() {
		return statusId;
	}
	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getStsName() {
		return stsName;
	}
	public void setStsName(String stsName) {
		this.stsName = stsName;
	}
	public String getStsNameId() {
		return stsNameId;
	}
	public void setStsNameId(String stsNameId) {
		this.stsNameId = stsNameId;
	}
	public String getLocationArea() {
		return locationArea;
	}
	public void setLocationArea(String locationArea) {
		this.locationArea = locationArea;
	}
	public String getSensorName() {
		return sensorName;
	}
	public void setSensorName(String sensorName) {
		this.sensorName = sensorName;
	}
	public int getSensorValue() {
		return sensorValue;
	}
	public void setSensorValue(int sensorValue) {
		this.sensorValue = sensorValue;
	}
	public String getLocationData() {
		return locationData;
	}
	public void setLocationData(String locationData) {
		this.locationData = locationData;
	}
	public int getEnergyAmount() {
		return energyAmount;
	}
	public void setEnergyAmount(int energyAmount) {
		this.energyAmount = energyAmount;
	}
	public String getSrtDate() {
		return srtDate;
	}
	public void setSrtDate(String srtDate) {
		this.srtDate = srtDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
}
