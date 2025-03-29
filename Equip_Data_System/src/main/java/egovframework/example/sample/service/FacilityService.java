package egovframework.example.sample.service;

import java.util.List;
import java.util.Map;

import egovframework.example.sample.vo.FacilityVO;

public interface FacilityService {
	
	List<Map<String, Object>> selectFacilityDataList(FacilityVO facilityVO) throws Exception;

	int getTntFacilityCnt(FacilityVO facilityVO) throws Exception;

	List<FacilityVO> getSelectStsNameList(FacilityVO facilityVO) throws Exception;
	
	List<FacilityVO> getSelectLocAreaInfo(FacilityVO facilityVO) throws Exception;

	

}
