<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      		uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   	uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     		uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>설비 관리 대시보드</title>
	<!-- TUI Grid CSS -->
	<link rel="stylesheet" href="https://uicdn.toast.com/grid/latest/tui-grid.css" />
	<!-- jQuery UI CSS -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<!-- 커스텀 CSS -->
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/main.css'/>"/>
</head>
<body>
 <div class="container">
    <!-- 헤더 -->
    <header class="header">
     <div class="logo">설비 관리 시스템</div>
      <div class="user-info">사용자: admin</div>
    </header>

    <!-- 네비게이션 include -->
    <%@ include file="/WEB-INF/jsp/egovframework/example/cmmn/frame/nav.jsp" %>

    <!-- 메인 콘텐츠 -->
    <main class="main">
      <h3>설비 데이터 목록</h3>
      <!-- 필터 영역 -->
      <div class="filter">
      	<div class="filter-group"> <!-- 상태와 위치를 묶는 그룹 -->
	   		 <div class="status-container">
		      <label for="facilityStatusSelect" style="font-size: 13px;">상태:</label>
		      <select id="facilityStatusSelect">
		        <option value="">-- 전체 --</option>
		      </select>
		    </div>
	      <div class="location-container">
	       	 <label for="locationArea" style="font-size: 13px;">위치:</label><!-- label을 여기로 이동 -->
		     <input type="text" id="locationArea" placeholder="위치를 적어주세요">
		     <div id="selectedLocations" class="selected-locations"></div>
			<button id="clearLocations" class="clear-btn">모두 지우기</button> <!-- 추가 -->	      </div>
        </div>
        <div class="form-group" id="selectUser"></div>
        <button id="searchBtn">조회</button> <!-- 조회 버튼 추가 -->
      </div>
      <!-- TUI Grid -->
      <div id="grid"></div>
      <div id="grid"></div>
      <div class="pagination">
          <button id="prevPage">이전</button>
          <span id="pageInfo"></span>
          <button id="nextPage">다음</button>
      </div>
    </main>

    <!-- 푸터 -->
    <footer class="footer">
      <p>© 2025 xAI. All rights reserved.</p>
    </footer>
  </div>
<!-- Jquery js -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

  <!-- TUI Grid JS -->
  <script src="https://uicdn.toast.com/grid/latest/tui-grid.js"></script>
  <script src="${pageContext.request.contextPath}/js/facility.js"></script>
</body>
</html>