import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchEpisodes, selectEpisodes } from '../../reducers/episodes';
import Episode from './Episode';

function Episodes() {
  const dispatch = useAppDispatch();
  const episodes = useAppSelector(selectEpisodes);

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

  return (
    <div className="episodes-page">
      <ul>
        {Object.entries(episodes)?.map(([id, episode]) => (
          <Episode episode={episode} key={episode.episode} />
        ))}
      </ul>
    </div>
  );
}

export default Episodes;
