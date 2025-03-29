package egovframework.example.sample.service;

import java.util.List;
import java.util.Map;

import egovframework.example.sample.vo.FacilityVO;

public interface FacilityStaticsService  {

	List<Map<String, Object>> getSensorSelectStatics(FacilityVO facilityVO) throws Exception;
	
	List<Map<String, Object>> getCntryEneAmnt(FacilityVO facilityVO) throws Exception;
	
}
