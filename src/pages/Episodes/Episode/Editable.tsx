import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { renameEpisode } from '../../../reducers/episodes';
import { EpisodeType } from '../../../types';

interface Props {
  episode: EpisodeType;
  endEditing: () => void;
  remove: () => void;
}

const Editable = ({ episode, endEditing, remove }: Props) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(episode.name);

  const save = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(renameEpisode({ id: episode.id, title: value }));
    setValue('');
    endEditing();
  };

  const cancelEditing = (event: React.FocusEvent<HTMLElement>) => {
    if (event.relatedTarget) {
      return;
    }

    endEditing();
  };

  const handleEpisodeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={save}>
      <input
        className="episode-input"
        type="text"
        autoFocus
        value={value}
        onChange={handleEpisodeNameChange}
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
};

export default Editable;
