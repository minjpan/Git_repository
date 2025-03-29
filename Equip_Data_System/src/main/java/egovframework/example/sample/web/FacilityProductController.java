package egovframework.example.sample.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FacilityProductController {
	
	private static final Logger log = LoggerFactory.getLogger(FacilityController.class);
	
	@GetMapping("/facilityProduct.do")
	public String facilityProduct(HttpServletRequest req, HttpServletResponse resp, ModelMap model) throws Exception {
		return "facility/facilityProduct";
	}

}
