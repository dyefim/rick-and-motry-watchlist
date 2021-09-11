import { useEffect, useState } from 'react';

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

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

function App() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const requestEpisodes = async (url = episodesUrl) => {
      try {
        const response = await fetch(url);

        const { info, results, error } =
          (await response.json()) as ApiResponse<Episode>;

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

  return (
    <div className="Main">
      <h1>Episodes</h1>
      <ul>
        {episodes?.map((episode) => {
          return <li key={episode.episode}>{episode.episode}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
