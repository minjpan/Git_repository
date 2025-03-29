package egovframework.example.sample.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.example.sample.service.FacilityStaticsService;
import egovframework.example.sample.vo.FacilityVO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FacilityStaticsServiceImpl extends EgovAbstractServiceImpl implements FacilityStaticsService {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(EgovSampleServiceImpl.class);
	
	private final FacilityStaticsMapper facilityStaticsDao;

	@Override
	public List<Map<String, Object>> getSensorSelectStatics(FacilityVO facilityVO) throws Exception {
		return facilityStaticsDao.getSensorSelectStatics(facilityVO);
	}
	
	@Override
	public List<Map<String, Object>> getCntryEneAmnt(FacilityVO facilityVO) throws Exception {
		return facilityStaticsDao.getCntryEneAmnt(facilityVO);
	}
}
