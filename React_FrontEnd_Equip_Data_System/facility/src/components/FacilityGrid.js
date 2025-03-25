import { useEffect, useRef } from "react";
import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";

const FacilityGrid = ({ data }) => {
  const gridRef = useRef(null);

  const columns = [
    { header: "Facility ID", name: "facilityId", align: "center", sortable: true },
    { header: "Facility Name", name: "facilityName", align: "center", sortable: true },
    { header: "Part ID", name: "partId", align: "center", sortable: true },
    { header: "Status ID", name: "statusId", align: "center", sortable: true },
    { header: "Status Name", name: "statusName", align: "center", sortable: true },
    { header: "Location", name: "locationArea", align: "center", sortable: true },
  ];

  useEffect(() => {
    if (!data) {
      console.warn("Data is not ready yet");
      return;
    }

    const gridElement = document.getElementById("grid");
    if (!gridElement) {
      console.error("Grid element not found");
      return;
    }

    // TUI Grid의 기본 행 높이(40px)와 헤더 높이(40px)를 기준으로 계산
    const rowHeight = 38; // TUI Grid의 기본 행 높이
    const headerHeight = 40; // TUI Grid의 기본 헤더 높이
    const totalRows = 11; // 표시할 행 수
    const bodyHeight = rowHeight * totalRows; // 10줄 높이
    const totalHeight = bodyHeight + headerHeight; // 헤더 포함 총 높이

    if (!gridRef.current) {
      gridRef.current = new Grid({
        el: gridElement,
        columns,
        data,
        bodyHeight: bodyHeight, // 10줄에 맞는 높이
        scrollX: true,
        scrollY: true, // 세로 스크롤 비활성화
        rowHeaders: ["rowNum"],
      });
      console.log("Grid instance:", gridRef.current);
      console.log("Grid dispatch:", gridRef.current.dispatch);
    } else {
      gridRef.current.resetData(data);
    }

    return () => {
      if (gridRef.current) {
        gridRef.current.destroy();
        gridRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="grid-container">
      <div id="grid" style={{ width: "100%" }} />
    </div>
  );
};

export default FacilityGrid;