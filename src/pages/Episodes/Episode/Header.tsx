import { EpisodeType } from '../../../types';

interface Props {
  episode: EpisodeType;
}

const Header = ({ episode }: Props) => {
  return (
    <div className="header">
      <span>{episode.episode}</span>
      <span>{episode.air_date}</span>
    </div>
  );
};

export default Header;
