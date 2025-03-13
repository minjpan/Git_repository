 const data = [
	  { id: 1, name: '설비 A', status: 'Active', location: 'Zone 1' },
	  { id: 2, name: '설비 B', status: 'Inactive', location: 'Zone 2' },
	  { id: 3, name: '설비 C', status: 'Maintenance', location: 'Zone 3' },
	  { id: 4, name: '설비 D', status: 'Active', location: 'Zone 1' },
	  { id: 5, name: '설비 E', status: 'Inactive', location: 'Zone 3' },
	];

	const columns = [
	  { header: 'ID', name: 'id', align: 'center' },
	  { header: '설비 이름', name: 'name', align: 'left' },
	  { header: '상태', name: 'status', align: 'center' },
	  { header: '위치', name: 'location', align: 'left' },
	];

	const grid = new tui.Grid({
	  el: document.getElementById('grid'),
	  data: data,
	  columns: columns,
	  bodyHeight: 300,
	  scrollX: true,
	  scrollY: true,
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
  