import { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { deleteEpisode } from '../../../reducers/episodes';
import { EpisodeType } from '../../../types';
import Editable from './Editable';
import Header from './Header';
import TitleRow from './TitleRow';

interface Props {
  episode: EpisodeType;
}

const Episode = ({ episode }: Props) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const endEditing = () => {
    setIsEditing(false);
  };

  const remove = () => {
    dispatch(deleteEpisode(episode.id));
  };

  const episodeCard = (
    <>
      <Header episode={episode} />
      <TitleRow episode={episode} startEditing={startEditing} remove={remove} />
    </>
  );

  return (
    <li className={`episode ${isEditing ? 'editable' : ''}`}>
      {isEditing ? (
        <Editable episode={episode} endEditing={endEditing} remove={remove} />
      ) : (
        episodeCard
      )}
    </li>
  );
};

export default Episode;
