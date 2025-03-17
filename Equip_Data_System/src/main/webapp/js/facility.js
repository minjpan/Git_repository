let grid;
let currentPage = 1;
let totalPages = 1;
let pageSize = 10;

let dataTmp;
let dataTmpList = [];
const locationInput = document.getElementById('locationArea');
const suggestionsBox = document.getElementById('autocompleteSuggestions');

	
$(document).ready(function() {
	const columns = [
	  	{ header: 'Facility ID', 				name: 'facilityId',  			align : 'center'},
	    { header: 'Facility Name', 		name: 'facilityName' ,  	align : 'center'},
	    { header: 'Part ID', 					name: 'partId' ,  				align : 'center'},
	    { header: 'Status ID', 				name: 'statusId' ,  			align : 'center'},
	    { header: 'Status Name', 		name: 'statusName' ,  	align : 'center'},
	    { header: 'Location', 				name: 'locationArea' ,  	align : 'center'}
	    
	    
	];

	  grid = new tui.Grid({
		  el: document.getElementById('grid'),
		  columns: columns,
		  data :[],
		  bodyHeight: 420,
		  scrollX: true,
		  scrollY: true,
		  rowHeaders : ['rowNum']
	});
	
	// 초기 데이터 로드
    loadFacilityData(currentPage);
    
    $('#searchBtn').click(function() {
		currentPage = 1;
		loadFacilityData(currentPage);
	});
	
	// 이전 버튼 클릭 이벤트
    $('#prevPage').click(function(){
        if (currentPage > 1) {
            currentPage--;
            loadFacilityData(currentPage);
        }
    });

    // 다음 버튼 클릭 이벤트
    $('#nextPage').click(function(){
        if (currentPage < totalPages) {
            currentPage++;
            loadFacilityData(currentPage);
        }
    });

	// 필터링 기능 추가
//	const statusFilter = document.getElementById('status-filter');
//	const locationFilter = document.getElementById('location-filter');

//	function applyFilters() {
//	  const statusValue = statusFilter.value;
//	  const locationValue = locationFilter.value.toLowerCase();
//
//	  const filteredData = data.filter(row => {
//	    const matchesStatus = !statusValue || row.status === statusValue;
//	    const matchesLocation = !locationValue || row.location.toLowerCase().includes(locationValue);
//	    return matchesStatus && matchesLocation;
//	  });
	  
//	  grid.resetData(filteredData);
//	}

//	statusFilter.addEventListener('change', applyFilters);
//	locationFilter.addEventListener('input', applyFilters);
	

	//selectComboBox
	loadStsNameComboList();
	
	locationInput.addEventListener('input', function() {
    const input = this.value.trim();
    if (input) {
        loadLocAreaInfo(input); // 입력값으로 서버 데이터 요청
    } else {
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'none';
    }
});
	
	document.addEventListener('click', function(event) {
//		suggestionsBox = document.getElementById('autocompleteSuggestions');
    	if (!locationInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        	suggestionsBox.style.display = 'none';
    	}
	});
	
	// 초기값으로 호출
    const initialInput = locationInput.value.trim(); // 입력 필드의 초기 값
    loadLocAreaInfo(initialInput || ''); // 빈 문자열로 기본값 설정
    
    //enter key Search
    $("#locationArea").on("keypress", function(event) {
        if (event.keyCode === 13) {
            loadFacilityData(1);
        }
    });
    
    
    // jQuery UI Autocomplete 설정
        $("#locationArea").autocomplete({
            source: function(request, response) {
                const input = request.term.trim();
                if (input) {
                    loadLocAreaInfo(input, function(data) {
                        response(data);
                    });
                } else {
                    response([]);
                }
            },
            minLength: 1, // 최소 1글자 입력 시 요청
            delay: 300, // 300ms 지연 후 요청 (디바운스 효과)
            select: function(event, ui) {
                $("#locationArea").val(ui.item.value); // 선택 시 값 설정
                return false; 
            }
        });
    
    
    
});

// Ajax로 데이터 조회
function loadFacilityData(page) {
	
	const locationArea =  $('#locationArea').val().trim();
	
    $.ajax({
        url: '/selectFacilityList.do',
        method: 'GET',
        data: {
				pageIndex: page
				,stsNameId: $('#facilityStatusSelect option:selected').val()
				,locationArea : locationArea.toUpperCase()
				},
        dataType: 'json',
        success: function(response) {
			
			let  parsedResponse;
			if(typeof response === 'string') {
				parsedResponse = JSON.parse(response);
			}else {
				parsedResponse = response;
			};
			const data = parsedResponse.data;
			const pagination = parsedResponse.pagination;
			
			grid.resetData(data);
			
			// 페이징 정보 업데이트
			currentPage = pagination.currentPage;
			totalPages = pagination.totalPages;
			pageSize = pagination.pageSize;
			$('#pageInfo').text(`Page ${currentPage} of ${totalPages} (Total: ${pagination.totalRecords})`);
			
			// 버튼 활성화/비활성화
            $('#prevPage').prop('disabled', currentPage === 1);
            $('#nextPage').prop('disabled', currentPage === totalPages);
            
            console.log('데이터 조회 성공:', response);
           
        },
        error: function(xhr, status, error) {
    		console.error('데이터 조회 실패 - 상태: ' + status + ', 에러: ' + error + ', 응답: ' + xhr.responseText);
    		console.error('상태 코드: ' + xhr.status); // 상태 코드 추가
            alert('데이터를 불러오지 못했습니다.');
        }
    });
}

function loadStsNameComboList() {
	$.ajax({ 
      url: "/selectStsNameList.do", 
      method: 'GET',
      dataType : "json",
        success: function(data) {
            // 응답 데이터로 selectbox 채우기
            var select = $('#facilityStatusSelect');
            for (var i = 0; i < data.length; i++) {
			    select.append(
					 $('<option></option>')
		            .val(data[i].stsNameId) // value는 statusNameId
		            .text(data[i].stsName)  // 화면에 보이는 건 statusName
			    );
			}
        },
        error: function(error) {
    		console.error('error: ' + error); // 상태 코드 추가
            alert('데이터를 불러오지 못했습니다.');
        }
	}) 
}

function loadLocAreaInfo(inputValue) {
	
	locationArea =  $('#locationArea').val().trim();
	
	$.ajax({ 
      url: "/selectLocAreaInfo.do", 
      method: 'GET',
      data : {locationArea : locationArea.toUpperCase()},
      dataType : "json",
      success: function(data) {
			if (data && data.length > 0) {
	            // dataTmpList를 배열로 갱신
	            dataTmpList = data.map(function(item) {
					return item.locationArea;
				});
	            console.log('dataTmpList updated: ', dataTmpList);
	            updateSuggestions(inputValue); // 데이터 갱신 후 추천 목록 업데이트
	        } else {
	            dataTmpList = [];
	            console.log('No data received');
	        }
	    },
	    error: function(error) {
			console.error('error: ' + error); // 상태 코드 추가
	        alert('데이터를 불러오지 못했습니다.');
        }
	});
}

// 추천 목록 업데이트 함수
function updateSuggestions(input) {
    suggestionsBox.innerHTML = '';
    suggestionsBox.style.display = 'none';

    if (input && dataTmpList.length > 0) {
        const filteredLocations = dataTmpList.filter(function(location) {
			return location.toLowerCase().includes(input.toLowerCase());
			});

        if (filteredLocations.length > 0) {
            filteredLocations.forEach(function(location) {
                const suggestion = document.createElement('div');
                suggestion.textContent = location;
                suggestion.addEventListener('click', function() {
                    locationInput.value = location;
                    suggestionsBox.style.display = 'none';
                });
                suggestionsBox.appendChild(suggestion);
            });
            suggestionsBox.style.display = 'block';
        }
    }
}
	

  