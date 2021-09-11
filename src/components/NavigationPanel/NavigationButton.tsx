interface Props {
  tab: string;
  isActive: boolean;
  handleChangeTab: () => void;
}

const NavigationButton = ({ tab, isActive, handleChangeTab }: Props) => {
  return (
    <li onClick={handleChangeTab} className={isActive ? 'active' : ''}>
      {tab}
    </li>
  );
};

export default NavigationButton;
