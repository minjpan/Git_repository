let sensorPieChart;
let energyPieChart;
let startDatePicker;
let endDatePicker;

$(document).ready(function() {
    // DatePicker 초기화
    initializeDatePickers();

    // 초기 차트 로드
    let srtDate = $("#start-date-picker-target").val();
    let endDate = $("#end-date-picker-target").val();
    loadSensorUsageType(srtDate, endDate);
    loadCntryAmnt(srtDate, endDate);

    // 캘린더 외부 클릭 시 닫기
//    $(document).on('click', function(e) {
//       if (!$(e.target).closest('.tui-datepicker-input').length && !$(e.target).closest('.tui-datepicker').length) {
//           startDatePicker.close();
//           endDatePicker.close();
//       }
//   });

    // 조회 버튼 클릭 시 차트 갱신
//    $('#searchBtn').click(function() {
//        let srtDate = $("#start-date-picker-target").val();
//        let endDate = $("#end-date-picker-target").val();
//		
//		if (srtDate && endDate && new Date(srtDate) > new Date(endDate)) {
//			alert('시작 날짜는 종료 날짜보다 이전이어야 합니다.');
//			return;
//		}
//		
//        loadSensorUsageType(srtDate, endDate);
//        loadCntryAmnt(srtDate, endDate);
//    });
});

function initializeDatePickers() {
	
	var today = new Date();
	var oneYearsAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()); // 1년 전
	var tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()); // 10년 전
	var oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()); // 1년 후

    // 시작 날짜 DatePicker
    startDatePicker = new tui.DatePicker('#start-date-picker-container', {
        date: oneYearsAgo,
        input: {
            element: '#start-date-picker-target',
            format: 'yyyy-MM-dd'   
        },
        selectableRanges: [
            [tenYearsAgo, oneYearLater]
		],
        timePicker: false,
        language: 'ko'
    });

    // 종료 날짜 DatePicker
    endDatePicker = new tui.DatePicker('#end-date-picker-container', {
        date: today,
        input: {
            element: '#end-date-picker-target',
            format: 'yyyy-MM-dd'
        },
        selectableRanges: [
            [tenYearsAgo, oneYearLater]
        ],
        timePicker: false,
        language: 'ko'
    });

    // 시작 날짜 입력 필드 클릭 시
    $('#start-date-picker-target').on('click', function() {
        endDatePicker.close(); // 종료 날짜 캘린더 닫기
        startDatePicker.open(); // 시작 날짜 캘린더 열기
    });

    // 종료 날짜 입력 필드 클릭 시
    $('#end-date-picker-target').on('click', function() {
        startDatePicker.close(); // 시작 날짜 캘린더 닫기
        endDatePicker.open(); // 종료 날짜 캘린더 열기
    });

    // 시작 날짜 변경 시 차트 갱신
    startDatePicker.on('change', () => {
        let srtDate = $("#start-date-picker-target").val();
        let endDate = $("#end-date-picker-target").val();
        loadSensorUsageType(srtDate, endDate);
        loadCntryAmnt(srtDate, endDate);
    });

    // 종료 날짜 변경 시 차트 갱신
    endDatePicker.on('change', () => {
        let srtDate = $("#start-date-picker-target").val();
        let endDate = $("#end-date-picker-target").val();
        loadSensorUsageType(srtDate, endDate);
        loadCntryAmnt(srtDate, endDate);
    });
}

function loadSensorUsageType(srtDate, endDate) {
    $.ajax({
        url: '/selectSensorSatics.do',
        method: 'GET',
        data: {
            srtDate: srtDate,
            endDate: endDate
        },
        dataType: 'json',
        success: function(response) {
            let sensorDataTmp = response;
            const sensorData = sensorDataTmp.map(item => ({
                name: item.sensorName,
                data: item.sensorValue
            }));

            const el = document.getElementById('sensorChartContainer');
            const data = {
                categories: ['Sensor Used'],
                series: sensorData
            };

            const options = {
                chart: { title: 'Sensor Used', width: 600, height: 400 },
                series: {
                    dataLabels: { visible: true, anchor: 'outer' }
                }
            };

            if (sensorPieChart) {
                sensorPieChart.destroy();
            }

            sensorPieChart = toastui.Chart.pieChart({ el, data, options });
        },
        error: function(xhr, status, error) {
            console.error('데이터 조회 실패 - 상태: ' + status + ', 에러: ' + error + ', 응답: ' + xhr.responseText);
            console.error('상태 코드: ' + xhr.status);
            alert('데이터를 불러오지 못했습니다.');
        }
    });
}

function loadCntryAmnt(srtDate, endDate) {
    $.ajax({
        url: '/selectCntryEneAmnt.do',
        method: 'GET',
        data: {
            srtDate: srtDate,
            endDate: endDate
        },
        dataType: 'json',
        success: function(response) {
            let engyAmntDataTmp = response;
            const engyAmntData = engyAmntDataTmp.map(item => ({
                name: item.locationData,
                data: item.energyAmount
            }));

            const el = document.getElementById('energyChartContainer');
            const data = {
                categories: ['Energy Used Country'],
                series: engyAmntData
            };

            const options = {
                chart: { title: 'Energy Used Country', width: 600, height: 400 },
                series: {
                    dataLabels: { visible: true, anchor: 'outer' }
                }
            };

            if (energyPieChart) {
                energyPieChart.destroy();
            }

            energyPieChart = toastui.Chart.pieChart({ el, data, options });
        },
        error: function(xhr, status, error) {
            console.error('데이터 조회 실패 - 상태: ' + status + ', 에러: ' + error + ', 응답: ' + xhr.responseText);
            console.error('상태 코드: ' + xhr.status);
            alert('데이터를 불러오지 못했습니다.');
        }
    });
}