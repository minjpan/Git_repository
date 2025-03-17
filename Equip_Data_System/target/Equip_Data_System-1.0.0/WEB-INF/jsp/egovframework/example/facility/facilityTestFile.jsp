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

    <!-- 내비게이션 -->
    <nav class="nav">
      <ul>
       <li><a href="#">설비 목록 </a></li>
        <li><a href="#">설비 제작</a></li>
        <li><a href="#">설비 부서</a></li>
        <li><a href="#">설비 통계</a></li>
      </ul>
    </nav>

    <!-- 메인 콘텐츠 -->
    <main class="main">
      <h2>설비 데이터 목록</h2>
      <!-- 필터 영역 -->
      <div class="filter">
        <label>상태: 
          <select id="status-filter">
            <option value="">전체</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </label>
        <label>위치: 
          <input type="text" id="location-filter" placeholder="위치 검색">
        </label>
        <button id="searchBtn">조회</button> <!-- 조회 버튼 추가 -->
      </div>
      <!-- TUI Grid -->
      <div id="grid"></div>
    </main>

    <!-- 푸터 -->
    <footer class="footer">
      <p>© 2025 xAI. All rights reserved.</p>
    </footer>
  </div>

  <!-- TUI Grid JS -->
  <script src="https://uicdn.toast.com/grid/latest/tui-grid.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="${pageContext.request.contextPath}/js/facility.js"></script>
</body>
</html>