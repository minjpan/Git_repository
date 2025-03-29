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
<!--     <link rel="stylesheet" href="https://uicdn.toast.com/grid/latest/tui-grid.css" /> -->
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
            <div class="content">
                설비 제작 화면 입니다.
            </div>
            <div>
            제작 제작..!! 현재 개발중에 있습니다.....
            </div>
        </main>

        <!-- footer include -->
        <%@ include file="/WEB-INF/jsp/egovframework/example/cmmn/frame/footer.jsp" %>
    </div>

    <!-- jQuery js -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- TUI Grid JS -->
<!--     <script src="https://uicdn.toast.com/grid/latest/tui-grid.js"></script> -->
</body>
</html>