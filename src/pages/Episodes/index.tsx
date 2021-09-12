import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchEpisodes, selectEpisodes } from '../../reducers/episodes';
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

  const deleteEpisode = (id: number) => {
    // setEpisodes((episodes) => episodes.filter((episode) => episode.id !== id));
  };

  return (
    <div className="episodes-page">
      <ul>
        {episodes?.map((episode) => (
          <Episode
            episode={episode}
            remove={() => deleteEpisode(episode.id)}
            key={episode.episode}
          />
        ))}
      </ul>
    </div>
  );
}

export default Episodes;
