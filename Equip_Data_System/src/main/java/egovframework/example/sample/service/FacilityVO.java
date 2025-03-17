package egovframework.example.sample.service;

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
}
