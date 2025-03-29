package egovframework.example.sample.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.example.sample.service.FacilityService;
import egovframework.example.sample.vo.FacilityVO;
import egovframework.example.sample.service.SampleDefaultVO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FacilityServiceImpl extends EgovAbstractServiceImpl implements FacilityService {
	
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(EgovSampleServiceImpl.class);
	
	private final FacilityMapper facilityDao;

	@Override
	public List<Map<String, Object>> selectFacilityDataList(FacilityVO facilityVO) throws Exception {
		return facilityDao.selectFacilityDataList(facilityVO);
	}
	
	@Override
	public int getTntFacilityCnt(FacilityVO facilityVO) throws Exception {
		 return facilityDao.selectFacilityCnt(facilityVO);
	}
	
	@Override
	public List<FacilityVO> getSelectStsNameList(FacilityVO facilityVO) throws Exception {
		return facilityDao.selectStsNameList(facilityVO);
	}
	
	@Override
	public List<FacilityVO> getSelectLocAreaInfo(FacilityVO facilityVO) throws Exception {
		return facilityDao.selectLocAreaInfo(facilityVO);
	}
}
