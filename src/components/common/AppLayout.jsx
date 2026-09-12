import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar.jsx';
import TopNavbar from '../navigation/TopNavbar.jsx';
import BlockerDetailModal from '../dashboard/BlockerDetailModal.jsx';
import './AppLayout.css';

// Shared shell for every page that sits "inside" the product (Dashboard and
// the placeholder feature pages). Login and Role Selection render outside
// this layout since they don't show the sidebar/top bar.
//
// BlockerDetailModal is rendered once here (rather than per-page) since any
// page/component under this layout — search, notifications, a blocker
// table row — can open it via BlockerContext's openBlockerId state.
function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="app-layout__overlay"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <div className="app-layout__main">
        <TopNavbar onMenuClick={() => setMobileNavOpen((prev) => !prev)} />
        <div className="app-layout__content">
          <Outlet />
        </div>
      </div>
      <BlockerDetailModal />
    </div>
  );
}

export default AppLayout;
