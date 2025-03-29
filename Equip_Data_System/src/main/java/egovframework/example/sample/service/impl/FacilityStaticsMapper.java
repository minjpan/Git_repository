package egovframework.example.sample.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import egovframework.example.sample.vo.FacilityVO;

@Mapper
public interface FacilityStaticsMapper {
	
	List<Map<String, Object>>  getSensorSelectStatics(FacilityVO facilityVO) throws Exception;
	
	List<Map<String, Object>>  getCntryEneAmnt(FacilityVO facilityVO) throws Exception;

}
