import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
//죄회 및 init 조회
export const fetchFacilities = async (page, status, locations) => {
    const locationArea = Array.isArray(locations) ? locations.join(",").toUpperCase() : "";
    const response = await axios.get(`${BASE_URL}/selectFacilityList.do`, {
        params: {
            pageIndex: page,
            stsNameId: status,
            locationArea,
        },
    });

    return response.data; // JSON.parse 제거
};

//상태 get List
export const fetchStatusList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/selectStsNameList.do`);
        console.log('Response:', response.data); // 디버깅용 로그
        return response.data;
        // return JSON.parse(response.data);
    }catch (error) {
        console.error('Failed to fetch status list:', error.message);
        return [];
    }
};

//위치 get List
export const fetchLocationSuggestions = async (input) => {
    const response = await axios.get(`${BASE_URL}/selectLocAreaInfo.do`, {
        params: { locationArea: input.toUpperCase() },
    });

    return response.data;
};