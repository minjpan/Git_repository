package egovframework.example.sample.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.example.sample.service.FacilityStaticsService;
import egovframework.example.sample.vo.FacilityVO;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FacilityStaticsController {
	
	private static final Logger log = LoggerFactory.getLogger(FacilityController.class);
	
	private final FacilityStaticsService facilityStaticsService;

	@GetMapping("/facilityStatics.do")
	public String facilityStatics(HttpServletRequest req, HttpServletResponse resp, ModelMap model) throws Exception {
		return "facility/facilityStatics";
	}
	
	@GetMapping("/selectSensorSatics.do")
	@ResponseBody
	public String selectSensorSatics(FacilityVO facilityVO) throws Exception {
		
		List<Map<String, Object>> getStsSenSorSatics = facilityStaticsService.getSensorSelectStatics(facilityVO);
		
		ObjectMapper objectmapper = new ObjectMapper();
        String jsonStsNameDataList = objectmapper.writeValueAsString(getStsSenSorSatics);
        
        return jsonStsNameDataList;		
	}
	
	@GetMapping("/selectCntryEneAmnt.do")
	@ResponseBody
	public String selectCntryEneAmntList(FacilityVO facilityVO) throws Exception {
		
		List<Map<String, Object>> selectCntryEneAmnt = facilityStaticsService.getCntryEneAmnt(facilityVO);
		
		ObjectMapper objectmapper = new ObjectMapper();
        String jsonStsNameDataList = objectmapper.writeValueAsString(selectCntryEneAmnt);
        
        return jsonStsNameDataList;		
	}
	

}
