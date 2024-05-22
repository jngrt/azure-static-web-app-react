import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`/api/message`);
        console.log('Response:', response);

        const contentType = response.headers.get('Content-Type');
        console.log('Content-Type:', contentType);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const textResponse = await response.text();
        console.log('Text Response:', textResponse);

        try {
          const jsonResponse = JSON.parse(textResponse);
          const { text } = jsonResponse;

          if (typeof text === 'string') {
            setData(text);
          } else {
            console.log("unexpected data type", typeof text);
            // Handle unexpected data type
          }
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          setError('Error parsing JSON');
        }
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        setError('Fetch error');
      }
    })();
  }, []);

  return (
    <div>
      {data || error}
    </div>
  );
}

export default App;
