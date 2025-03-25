import React from "react";

const Header = () => (
  <header className="header">
    <div className="logo">설비 관리 시스템</div>
    <div className="user-info">
      <span>사용자: admin</span>
      <button className="logout-btn">로그아웃</button>
    </div>
  </header>
);

export default Header;