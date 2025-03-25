import { useState, useEffect } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FacilityGrid from "../components/FacilityGrid";
import { fetchFacilities, fetchStatusList, fetchLocationSuggestions } from "../services/api";
import "../styles/App.css";

const Dashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const statusData = await fetchStatusList();
      setStatusOptions(statusData);
      console.log("Initial selectedLocations:", selectedLocations);
      loadFacilities(currentPage);
    };
    loadInitialData();
  }, []);

  const loadFacilities = async (page) => {
    setLoading(true);
    try {
      console.log("Fetching with locations:", selectedLocations);
      const { data, pagination } = await fetchFacilities(page, selectedStatus, selectedLocations);
      setFacilities(data);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
      setTotalRecords(pagination.totalRecords || 0);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadFacilities(1);
  };

  const handleLocationInput = async (e) => {
    const value = e.target.value;
    setLocationInput(value);

    if (value.trim()) {
      try {
        const data = await fetchLocationSuggestions(value);
        const filteredSuggestions = Array.isArray(data)
          ? data
              .map((item) => (typeof item === "object" ? item.locationArea : item))
              .filter((loc) => loc && !selectedLocations.includes(loc))
          : [];
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("위치 제안 로드 실패:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const addLocation = (value) => {
    if (!selectedLocations.includes(value)) {
      setSelectedLocations([...selectedLocations, value]);
      loadFacilities(currentPage);
    }
    setLocationInput("");
    setSuggestions([]);
  };

  const removeLocation = (location) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    loadFacilities(currentPage);
  };

  const clearLocations = () => {
    setSelectedLocations([]);
    loadFacilities(currentPage);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      loadFacilities(newPage); // 페이지 변경 시 데이터 갱신
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <Nav />
        <main className="content">
          <h3>설비 데이터 목록</h3>
          <div className="filter">
            <div className="filter-group">
              <div className="status-container">
                <label htmlFor="facilityStatusSelect">상태:</label>
                <select
                  id="facilityStatusSelect"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">-- 전체 --</option>
                  {statusOptions.map((status) => (
                    <option key={status.stsNameId} value={status.stsNameId}>
                      {status.stsName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="location-container">
                <label htmlFor="locationArea">위치:</label>
                <div className="location-input-wrapper">
                  <input
                    id="locationArea"
                    value={locationInput}
                    onChange={handleLocationInput}
                    onKeyPress={(e) => e.key === "Enter" && addLocation(locationInput)}
                    placeholder="위치를 적어주세요"
                  />
                  {suggestions.length > 0 && (
                    <ul className="suggestions">
                      {suggestions.map((sug) => (
                        <li key={sug} onClick={() => addLocation(sug)}>
                          {sug}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="selected-locations">
                    {selectedLocations.map((loc) => (
                      <span key={loc} className="location-tag">
                        {loc}
                        <span className="remove-tag" onClick={() => removeLocation(loc)}>
                          x
                        </span>
                      </span>
                    ))}
                    {selectedLocations.length > 0 && (
                      <button className="clear-btn" onClick={clearLocations}>
                        모두 지우기
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button id="searchBtn" onClick={handleSearch}>
              조회
            </button>
          </div>
          {loading ? <p>로딩 중...</p> : <FacilityGrid data={facilities} />}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              이전
            </button>
            <span>
              Page {currentPage} of {totalPages} (Total: {totalRecords})
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              다음
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;