import { useState, useEffect } from "react";

const apiPort = import.meta.env.VITE_API_PORT;
const baseUrl = `http://localhost:${apiPort}/api`;

export function Hello() {
  const [laravelText, setLaravelText] = useState(null);

  useEffect(() => {
    const fetchLaravelText = async () => {
      try {
        const response = await fetch(`${baseUrl}/hello`);
        const data = await response.json();

        setLaravelText(data.message);
      } catch (error) {
        console.error("Error fetching data from Laravel:", error);
      }
    };

    fetchLaravelText();
  }, []);

  return (
    <>
      <div>
        <h1>Below is a message from Laravel app</h1>
        {laravelText ? <p>{laravelText}</p> : <p>Loading...</p>}
      </div>
    </>
  );
}