import { useState } from 'react';
import NavigationPanel from './components/NavigationPanel';
import PAGES, { pageNames } from './pages';

function App() {
  const [activePage, setActivePage] = useState(pageNames[0]);

  return (
    <div className="Main">
      <NavigationPanel
        tabList={pageNames}
        activeTab={activePage}
        setActiveTab={setActivePage}
      />
      <div className="container">{PAGES[activePage]}</div>
    </div>
  );
}

export default App;
