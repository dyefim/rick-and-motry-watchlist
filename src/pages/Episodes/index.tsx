import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchEpisodes,
  selectEpisodes,
  deleteEpisode,
} from '../../reducers/episodes';
import Episode from './Episode';

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<R> {
  info?: Info;
  results?: R[];
  error?: string;
}

export interface EpisodeType {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

function Episodes() {
  const dispatch = useAppDispatch();
  const episodes = useAppSelector(selectEpisodes);
  // const [episodes, setEpisodes] = useState<EpisodeType[]>([]);

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

  const remove = (id: number | string) => {
    dispatch(deleteEpisode(id));
  };

  return (
    <div className="episodes-page">
      <ul>
        {Object.entries(episodes)?.map(([id, episode]) => (
          <Episode
            episode={episode}
            remove={() => remove(id)}
            key={episode.episode}
          />
        ))}
      </ul>
    </div>
  );
}

export default Episodes;
