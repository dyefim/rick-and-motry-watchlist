import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { renameEpisode } from '../../reducers/episodes';
import { EpisodeType } from './index';

interface Props {
  episode: EpisodeType;
  remove: () => void;
}

const Episode = ({ episode, remove }: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const edit = (event: React.MouseEvent) => {
    setValue(episode.name);
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const save = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(renameEpisode({ id: episode.id, title: value }));
    setValue('');
    setIsEditing(false);
  };

  const cancelEditing = (event: any) => {
    if (event.relatedTarget) {
      return;
    }

    setIsEditing(false);
  };

  const editable = (
    <form onSubmit={save}>
      <input
        className="episode-input"
        type="text"
        autoFocus
        value={value}
        onChange={handleChange}
        onBlur={cancelEditing}
      />
      <div className="buttons">
        <button type="submit" className="save">
          save
        </button>
        <button type="button" onClick={remove} className="delete">
          delete
        </button>
      </div>
    </form>
  );

  const episodeCard = (
    <div>
      <div className="header">
        <span>{episode.episode}</span>
        <span>{episode.air_date}</span>
      </div>
      <div onClick={edit} className="title">
        {episode.name}
      </div>
    </div>
  );

  return (
    <li className={`episode ${isEditing ? 'editable' : ''}`}>
      {isEditing ? editable : episodeCard}
    </li>
  );
};

export default Episode;
