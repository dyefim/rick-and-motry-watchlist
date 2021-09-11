import { useEffect, useState } from 'react';

const baseUrl = 'https://rickandmortyapi.com/api/episode';

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const requestEpisodes = async () => {
      try {
        const response = await fetch(baseUrl);

        const { info, results, error } = await response.json();

        if (error) {
          return console.error(`Error when fetching ${baseUrl}. ${error}`);
        }

        console.log(results);
      } catch (error) {
        console.log(error);
      }
    };

    requestEpisodes();
  }, []);

  return (
    <div className="Main">
      <h1>Episodes</h1>
    </div>
  );
}

export default App;
