import { useState } from 'react';
import NavigationPanel from './components/NavigationPanel';
import Episodes from './pages/Episodes';

export const TABS = {
  episodes: <Episodes />,
};

export type TabType = keyof typeof TABS;

const tabNames = Object.keys(TABS) as TabType[];

function App() {
  const [activeTab, setActivetab] = useState(tabNames[0]);

  return (
    <div className="Main">
      <NavigationPanel
        tabList={tabNames}
        activeTab={activeTab}
        setActivetab={setActivetab}
      />
      {TABS[activeTab]}
    </div>
  );
}

export default App;
