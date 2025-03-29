let grid;
let currentPage = 1;
let totalPages = 1;
let pageSize = 10;

let dataTmpList = [];
let selectedLocations = []; // 선택된 위치 배열

$(document).ready(function() {
    const columns = [
        { header: 'Facility ID', name: 'facilityId', align: 'center' },
        { header: 'Facility Name', name: 'facilityName', align: 'center' },
        { header: 'Part ID', name: 'partId', align: 'center' },
        { header: 'Status ID', name: 'statusId', align: 'center' },
        { header: 'Status Name', name: 'statusName', align: 'center' },
        { header: 'Location', name: 'locationArea', align: 'center' }
    ];

    grid = new tui.Grid({
        el: document.getElementById('grid'),
        columns: columns,
        data: [],
        bodyHeight: 420,
        scrollX: true,
        scrollY: true,
        rowHeaders: ['rowNum']
    });

    // jQuery UI SelectMenu 초기화
    $("#facilityStatusSelect").selectmenu({
        width: 120,
        change: function(event, ui) {
            loadFacilityData(currentPage);
        }
    });

    // 초기 데이터 로드
    loadFacilityData(currentPage);

    $('#searchBtn').click(function() {
        currentPage = 1;
        loadFacilityData(currentPage);
    });

    // 이전 버튼 클릭 이벤트
    $('#prevPage').click(function() {
        if (currentPage > 1) {
            currentPage--;
            loadFacilityData(currentPage);
        }
    });

    // 다음 버튼 클릭 이벤트
    $('#nextPage').click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            loadFacilityData(currentPage);
        }
    });

    // selectComboBox
    loadStsNameComboList();

    // jQuery UI Autocomplete 설정
    $("#locationArea").autocomplete({
        source: function(request, response) {
            const input = request.term.trim();
            if (input) {
                loadLocAreaInfo(input, function(data) {
                    // 이미 선택된 항목 제외
                    const availableLocations = [];
                    for (let i = 0; i < data.length; i++) {
                        if (!selectedLocations.includes(data[i])) {
                            availableLocations.push(data[i]);
                        }
                    }
                    response(availableLocations);
                });
            } else {
                response([]);
            }
        },
        minLength: 1,
        delay: 300,
        select: function(event, ui) {
            const selectedValue = ui.item.value;
            if (!selectedLocations.includes(selectedValue)) {
                selectedLocations.push(selectedValue);
                renderSelectedLocations();
            }
            $("#locationArea").val(""); // 선택 후 입력 필드 초기화
            return false;
        }
    }).on("keypress", function(event) {
        if (event.keyCode === 13) {
            loadFacilityData(1);
        }
    });

    // 태그 렌더링 함수
    function renderSelectedLocations() {
        const container = $("#selectedLocations");
        container.empty();
        selectedLocations.forEach(location => {
            const tag = $(`
                <span class="location-tag">
                    ${location}
                    <span class="remove-tag">x</span>
                </span>
            `);
            container.append(tag);
        });
    }

    // 위치 입력 필드에서 Enter로 태그 추가
    $("#locationArea").on("keypress", function(e) {
        if (e.which === 13) { // Enter 키
            const value = $(this).val().trim();
            if (value) {
                addLocationTag(value);
                $(this).val(""); // 입력 필드 초기화
            }
        }
    });

    // 태그 추가 함수
    function addLocationTag(value) {
        const tag = `
            <span class="location-tag">
                ${value}
                <span class="remove-tag">x</span>
            </span>
        `;
        $("#selectedLocations").append(tag);
    }

    // 개별 태그 삭제
    $("#selectedLocations").on("click", ".remove-tag", function() {
        const location = $(this).parent(".location-tag").text().replace('x', '').trim();
        selectedLocations = selectedLocations.filter(loc => loc !== location);
        renderSelectedLocations();
        loadFacilityData(currentPage); // 데이터 새로고침
    });

    // 모든 태그 삭제
    $("#clearLocations").on("click", function() {
        selectedLocations = [];
        renderSelectedLocations();
        loadFacilityData(currentPage); // 데이터 새로고침
    });

    // 초기 테스트 태그 추가
    renderSelectedLocations();
});

// Ajax로 데이터 조회
function loadFacilityData(page) {
    const locationArea = selectedLocations.join(',');
    $.ajax({
        url: '/selectFacilityList.do',
        method: 'GET',
        data: {
            pageIndex: page,
            stsNameId: $('#facilityStatusSelect').val(),
            locationArea: locationArea.toUpperCase()
        },
        dataType: 'json',
        success: function(response) {
            let parsedResponse;
            if (typeof response === 'string') {
                parsedResponse = JSON.parse(response);
            } else {
                parsedResponse = response;
            }
            const data = parsedResponse.data;
            const pagination = parsedResponse.pagination;

            grid.resetData(data);

            // 페이징 정보 업데이트
            currentPage = pagination.currentPage;
            totalPages = pagination.totalPages;
            pageSize = pagination.pageSize;

            $('#pageInfo').text('Page ' + currentPage + ' of ' + totalPages + ' (Total: ' + pagination.totalRecords + ')');

            $('#prevPage').prop('disabled', currentPage === 1);
            $('#nextPage').prop('disabled', currentPage === totalPages);
        },
        error: function(xhr, status, error) {
            console.error('데이터 조회 실패 - 상태: ' + status + ', 에러: ' + error + ', 응답: ' + xhr.responseText);
            console.error('상태 코드: ' + xhr.status);
            alert('데이터를 불러오지 못했습니다.');
        }
    });
}

function loadStsNameComboList() {
    $.ajax({
        url: "/selectStsNameList.do",
        method: 'GET',
        dataType: "json",
        success: function(data) {
            // 응답 데이터로 selectbox 채우기
            var select = $('#facilityStatusSelect');
            for (var i = 0; i < data.length; i++) {
                select.append(
                    $('<option></option>')
                        .val(data[i].stsNameId)
                        .text(data[i].stsName)
                );
            }
            // selectmenu 갱신
            $("#facilityStatusSelect").selectmenu("refresh");
        },
        error: function(error) {
            console.error('error: ' + error);
            alert('데이터를 불러오지 못했습니다.');
        }
    });
}

function loadLocAreaInfo(inputValue, callback) {
    $.ajax({
        url: "/selectLocAreaInfo.do",
        method: 'GET',
        data: { locationArea: inputValue.toUpperCase() },
        dataType: "json",
        success: function(data) {
            if (data && data.length > 0) {
                dataTmpList = [];
                for (let i = 0; i < data.length; i++) {
                    dataTmpList.push(data[i].locationArea);
                }
                console.log('dataTmpList updated: ', dataTmpList);
                callback(dataTmpList);
            } else {
                dataTmpList = [];
                console.log('No data received');
                callback([]);
            }
        },
        error: function(error) {
            console.error('error: ' + error);
            alert('데이터를 불러오지 못했습니다.');
            callback([]);
        }
    });
}