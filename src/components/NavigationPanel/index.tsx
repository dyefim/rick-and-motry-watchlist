import { TabType } from '../../App';
import NavigationButton from './NavigationButton';

interface Props {
  tabList: TabType[];
  activeTab: string;
  setActivetab: (tab: TabType) => void;
}

const NavigationPanel = ({ tabList, activeTab, setActivetab }: Props) => {
  return (
    <nav className="navigation">
      <ul>
        {tabList.map((tab) => (
          <NavigationButton
            tab={tab}
            handleChangeTab={() => setActivetab(tab)}
            isActive={tab === activeTab}
            key={tab}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationPanel;
