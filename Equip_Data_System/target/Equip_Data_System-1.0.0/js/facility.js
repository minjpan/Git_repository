
 /*
 	const data = [
	  { id: 1, name: '설비 A', status: 'Active', location: 'Zone 1' },
	  { id: 2, name: '설비 B', status: 'Inactive', location: 'Zone 2' },
	  { id: 3, name: '설비 C', status: 'Maintenance', location: 'Zone 3' },
	  { id: 4, name: '설비 D', status: 'Active', location: 'Zone 1' },
	  { id: 5, name: '설비 E', status: 'Inactive', location: 'Zone 3' },
	];
	*/
	
$(document).ready(function(){	
	const columns = [
	  { header: 'Facility ID', 				name: 'facilityId' },
        { header: 'Facility Name', 		name: 'facilityName' },
        { header: 'Part ID', 					name: 'partId' },
        { header: 'Status ID', 				name: 'statusId' },
        { header: 'Status Name', 		name: 'statusName' }
	];

	const grid = new tui.Grid({
	  el: document.getElementById('grid'),
	  columns: columns,
	  data :[],
	  bodyHeight: 300,
	  scrollX: true,
	  scrollY: true,
	  rowHeaders : ['rowNum']
	});

	// 필터링 기능 추가
	const statusFilter = document.getElementById('status-filter');
	const locationFilter = document.getElementById('location-filter');

	function applyFilters() {
	  const statusValue = statusFilter.value;
	  const locationValue = locationFilter.value.toLowerCase();

	  const filteredData = data.filter(row => {
	    const matchesStatus = !statusValue || row.status === statusValue;
	    const matchesLocation = !locationValue || row.location.toLowerCase().includes(locationValue);
	    return matchesStatus && matchesLocation;
	  });

	  grid.resetData(filteredData);
	}

	statusFilter.addEventListener('change', applyFilters);
	locationFilter.addEventListener('input', applyFilters);
});

$('#searchBtn').click(function(){
	onSearch();
});

// Ajax로 데이터 조회
function onSearch() {
    $.ajax({
        url: '/selectFacilityList.do', 
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            grid.resetData(response);
            console.log('데이터 조회 성공:', response);
        },
        error: function(xhr, status, error) {
    		console.error('데이터 조회 실패 - 상태: ' + status + ', 에러: ' + error + ', 응답: ' + xhr.responseText);
            alert('데이터를 불러오지 못했습니다.');
        }
    });
}

  