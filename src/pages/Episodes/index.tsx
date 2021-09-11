import { useEffect, useState } from 'react';
import Episode from './Episode';

const episodesUrl = 'https://rickandmortyapi.com/api/episode';

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
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);

  useEffect(() => {
    const requestEpisodes = async (url = episodesUrl) => {
      try {
        const response = await fetch(url);

        const { info, results, error } =
          (await response.json()) as ApiResponse<EpisodeType>;

        if (error) {
          return console.error(`Error when fetching ${url}. ${error}`);
        }

        if (results?.length) {
          setEpisodes((episodes) => [...episodes, ...results]);
        }

        if (info?.next) {
          requestEpisodes(info.next);
        }
      } catch (error) {
        console.error(error);
      }
    };

    requestEpisodes();
  }, []);

  const deleteEpisode = (id: number) => {
    setEpisodes((episodes) => episodes.filter((episode) => episode.id !== id));
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
