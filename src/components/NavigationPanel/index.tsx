import { PageType } from '../../pages';
import NavigationButton from './NavigationButton';

interface Props {
  tabList: PageType[];
  activeTab: string;
  setActiveTab: (tab: PageType) => void;
}

const NavigationPanel = ({ tabList, activeTab, setActiveTab }: Props) => {
  return (
    <nav className="navigation">
      <ul>
        {tabList.map((tab) => (
          <NavigationButton
            tab={tab}
            handleChangeTab={() => setActiveTab(tab)}
            isActive={tab === activeTab}
            key={tab}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationPanel;
