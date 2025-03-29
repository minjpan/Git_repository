let currentPage = 1;

$(document).ready(function() {
	
	loadFacilityStatics(currentPage);
	
});

	function loadFacilityStatics(page) {
   		$.ajax({
			url: '/selectSaticsList.do',
			method: 'GET',
			data: {
				pageIndex: page
			},
			datatype: 'json',
			success:function(reponse) {
				alert('성공');
			},
			error: function(xhr, status, error) {
			  		console.error('데이터 조회 실패 - 상태: ' + status + ', 에러: ' + error + ', 응답: ' + xhr.responseText);
			  		console.error('상태 코드: ' + xhr.status); // 상태 코드 추가
			          alert('데이터를 불러오지 못했습니다.');
			}
		)};
	}
	