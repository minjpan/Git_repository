package egovframework.example.sample.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springmodules.validation.commons.DefaultBeanValidator;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.example.sample.service.EgovSampleService;
import egovframework.example.sample.service.FacilityService;
import egovframework.example.sample.service.FacilityVO;
import egovframework.example.sample.service.SampleDefaultVO;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class FacilityController {
	
	private static final Logger log = LoggerFactory.getLogger(FacilityController.class);
	
	private final EgovPropertyService propertiesService;
	private final FacilityService facilityService;
	
	@GetMapping("/facilityMain.do")
	public String facilityMain(HttpServletRequest req, HttpServletResponse resp,  ModelMap model) throws Exception {
		return "facility/facilityFile";
	}
	
	/** 상태 selectCombo */
	@GetMapping("/selectStsNameList.do")
	@ResponseBody
	public String getSelectStsNameList(FacilityVO facilityVO) throws Exception {
		
		List<FacilityVO> getStsNameTmp = facilityService.getSelectStsNameList(facilityVO);
		
		ObjectMapper objectmapper = new ObjectMapper();
        String jsonStsNameDataList = objectmapper.writeValueAsString(getStsNameTmp);
        
        return jsonStsNameDataList;
	}
	
	@GetMapping("/selectLocAreaInfo.do")
	@ResponseBody
	public String getSelectLocAreaInfo(FacilityVO facilityVO) throws Exception {
		
		List<FacilityVO> getSelectLocAreaInfo = facilityService.getSelectLocAreaInfo(facilityVO);
		
		ObjectMapper objectmapper = new ObjectMapper();
        String jsonStsNameDataList = objectmapper.writeValueAsString(getSelectLocAreaInfo);
        
        return jsonStsNameDataList;
	}

//	@GetMapping(value = "/selectFacilityList.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@GetMapping(value = "/selectFacilityList.do")
	@ResponseBody
	public String selectFacilityList(@ModelAttribute("searchVO") SampleDefaultVO searchVO, FacilityVO facilityVO, ModelMap model) throws Exception {
		
		/** EgovPropertyService.sample */
		searchVO.setPageUnit(propertiesService.getInt("pageUnit", 10)); // 기본값 10
		searchVO.setPageSize(propertiesService.getInt("pageSize", 10)); // 기본값 10

		/** Paging setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());
		
		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		// 서비스에서 List<FacilityVO> 조회
		facilityVO.setFirstIndex(searchVO.getFirstIndex());
		facilityVO.setRecordCountPerPage(searchVO.getRecordCountPerPage());
		
		//facility Data select
        List<Map<String, Object>> facilityDataList = facilityService.selectFacilityDataList(facilityVO);
        
        //Tnt record select
        int totCnt = facilityService.getTntFacilityCnt(facilityVO);
        paginationInfo.setTotalRecordCount(totCnt);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", facilityDataList);
        response.put("pagination", new HashMap<String, Object>() {{
        	put("currentPage", paginationInfo.getCurrentPageNo());
        	put("totalPages", paginationInfo.getTotalPageCount());
        	put("totalRecords", paginationInfo.getTotalRecordCount());
        	put("pageSize", paginationInfo.getPageSize());
        }});
        
        ObjectMapper objectmapper = new ObjectMapper();
        String jsonFacilityDataList = objectmapper.writeValueAsString(response);
        
        log.info("JSON Response: {}", jsonFacilityDataList);
        
        return jsonFacilityDataList;
    }
}
