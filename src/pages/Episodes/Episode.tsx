import { useState } from 'react';
import { EpisodeType } from './index';

interface Props {
  episode: EpisodeType;
}

const Episode = ({ episode }: Props) => {
  const [value, setValue] = useState(episode.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const save = (event: React.FormEvent) => {
    setIsEditing(false);
  };

  return isEditing ? (
    <form onSubmit={save}>
      <input
        className="episode"
        type="text"
        autoFocus
        value={value}
        onChange={handleChange}
        onBlur={save}
      />
    </form>
  ) : (
    <li className="episode" onClick={handleClick}>
      {value}
    </li>
  );
};

export default Episode;
