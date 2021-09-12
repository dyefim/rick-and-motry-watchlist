import { EpisodeType } from '../../../types';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

interface Props {
  episode: EpisodeType;
  startEditing: () => void;
  remove: () => void;
}

const TitleRow = ({ episode, startEditing, remove }: Props) => {
  return (
    <div onClick={startEditing} className="title-row">
      <p>{episode.name}</p>
      <button onClick={remove} className="trashcan-button">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default TitleRow;
