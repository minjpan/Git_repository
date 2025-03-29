package egovframework.example.sample.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import egovframework.example.sample.vo.FacilityVO;

@Mapper
public interface FacilityMapper {

	List<Map<String, Object>> selectFacilityDataList(FacilityVO facilityVO) throws Exception;

	int selectFacilityCnt(FacilityVO facilityVO) throws Exception;

	List<FacilityVO> selectStsNameList(FacilityVO facilityVO) throws Exception;
	
	List<FacilityVO> selectLocAreaInfo(FacilityVO facilityVO) throws Exception;
	
	
}
