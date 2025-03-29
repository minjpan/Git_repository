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
    <link rel="stylesheet" href="https://uicdn.toast.com/grid/latest/tui-grid.css" />
    <!-- TUI SelectBox CSS -->
    <link rel="stylesheet" href="https://uicdn.toast.com/select-box/latest/tui-select-box.min.css" />
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
            <h3>설비 데이터 목록</h3>
            <br/>
            <!-- 필터 영역 -->
            <div class="filter">
                <div class="filter-group">
                    <!-- 상태와 위치를 묶는 그룹 -->
                    <div class="status-container">
                        <label for="facilityStatusSelect" style="font-size: 13px;">상태:</label>
                        <select id="facilityStatusSelect">
                            <option value="">-- 전체 --</option>
                        </select>
                    </div>
                    <div class="location-container">
                        <label for="locationArea" style="font-size: 13px;">위치:</label>
                        <input type="text" id="locationArea" placeholder="위치를 적어주세요">
                        <div id="selectedLocations" class="selected-locations"></div>
                    </div>
                    <button id="clearLocations" class="clear-btn">모두 지우기</button>
                </div>
                <div class="form-group" id="selectUser"></div>
                <button id="searchBtn" class="search-btn">조회</button>
            </div>

            <!-- TUI Grid -->
            <div id="grid"></div>
            <div class="pagination">
                <button id="prevPage">이전</button>
                <span id="pageInfo"></span>
                <button id="nextPage">다음</button>
            </div>
        </main>

        <!-- footer include -->
        <%@ include file="/WEB-INF/jsp/egovframework/example/cmmn/frame/footer.jsp" %>
    </div>

    <!-- jQuery js -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- TUI Grid JS -->
    <script src="https://uicdn.toast.com/grid/latest/tui-grid.js"></script>
    <!-- TUI SelectBox JS -->
    <script src="https://uicdn.toast.com/select-box/latest/tui-select-box.min.js"></script>
    <!-- 커스텀 JS -->
    <script src="${pageContext.request.contextPath}/js/facility.js"></script>
</body>
</html>