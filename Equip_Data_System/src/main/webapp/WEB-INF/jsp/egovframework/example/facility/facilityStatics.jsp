<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>설비 관리 대시보드</title>
    <!-- TUI Grid CSS -->
        <link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
    	<link rel="stylesheet" href="https://uicdn.toast.com/chart/latest/toastui-chart.min.css" />
    <!-- jQuery UI CSS -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <!-- 커스텀 CSS -->
    <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/main.css'/>"/>
</head>
<body>
    <div class="container">
        <!-- 헤더 include -->
        <%@ include file="/WEB-INF/jsp/egovframework/example/cmmn/frame/header.jsp" %>

        <!-- 네비게이션 include -->
        <%@ include file="/WEB-INF/jsp/egovframework/example/cmmn/frame/nav.jsp" %>

        <!-- 메인 콘텐츠 -->
        <main class="main">
     		 <h3>설비 통계 그래프</h3>
    		 <br/>
            <!-- 필터 영역 -->
      <div class="filter">
        <div class="filter-group">
        
		<!-- DateRangePicker 추가 -->
		<div class="date-range-container">
		<label style="font-size: 13px;">날짜 범위 :</label>
			<div class="date-picker-wrapper">
				<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
					<input type="text" id="start-date-picker-target" aria-label="Start Date" placeholder="시작 날짜" />
					<span class="tui-ico-date"></span>
				</div>
			<div id="start-date-picker-container"></div>
			</div>
		<span>~</span>
		<div class="date-picker-wrapper">
			<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				<input type="text" id="end-date-picker-target" aria-label="End Date" placeholder="종료 날짜" />
				<span class="tui-ico-date"></span>
			</div>
			<div id="end-date-picker-container"></div>
		</div>
		</div>
            
        </div>
<!--         <div class="form-group" id="selectUser"></div> -->
<!--         <button id="searchBtn">조회</button> -->
      </div>
	      <div class="chart-wrapper">
	         <!--  Tui Chart -->
       		<div id="sensorChartContainer" style="width: 600px; height: 400px"></div>
       		<div id="energyChartContainer" style="width: 600px; height: 400px"></div>
       		</div>
        </main>
     

        <!-- footer include -->
        <%@ include file="/WEB-INF/jsp/egovframework/example/cmmn/frame/footer.jsp" %>
    </div>

    <!-- jQuery js -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- TUI Grid JS -->
    <script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
    <script src="https://uicdn.toast.com/chart/latest/toastui-chart.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/facilityStatics.js"></script>
    

</body>
</html>