import React, { useEffect, useState } from 'react';
import './Structure.css';
import { Rings } from 'react-loader-spinner'; // Assuming you are using 'react-loader-spinner' for the loader

function Structure() {
  const [countries, setCountries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialText, setInitialText] = useState(true); // State for initial text
  const postText = "Explain in detail about countries data";

  useEffect(() => {
    fetch('http://localhost:4000/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSendMessage = async () => {
    setInitialText(false);
    setLoading(true);
    const message = postText;
    try {
      const response = await fetch('http://127.0.0.1:8000/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-7b',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1000,
          temperature: 0.7,
          stream: false,
        }),
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        setLoading(false);
        return;
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || "No response from API";

      setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: assistantMessage }]);
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Overall Rank</th>
            <th>Country or Region</th>
            <th>Score</th>
            <th>GDP per Capita</th>
            <th>Social Support</th>
            <th>Healthy Life Expectancy</th>
            <th>Freedom to Make Life Choices</th>
            <th>Generosity</th>
            <th>Perceptions of Corruption</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.overall_rank}</td>
              <td>{country.country_or_region}</td>
              <td>{country.score}</td>
              <td>{country.GDP_per_capita}</td>
              <td>{country.Social_support}</td>
              <td>{country.Healthy_life_expectancy}</td>
              <td>{country.Freedom_to_make_life_choices}</td>
              <td>{country.Generosity}</td>
              <td>{country.Perceptions_of_corruption}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-right">
        <div className="post-button">
          <p>{postText}</p>
          <button className='modern-button' onClick={handleSendMessage}>Send Query</button>
        </div>
        <div className='response-text'>
          {initialText ? (
            <p>Click "Send Query" for a response.</p>
          ) : loading ? (
            <div className="loader-container">
              <Rings height="80" width="80" color="blue" ariaLabel="loading" />
            </div>
          ) : (
            messages.map((msg, index) => (
              <p key={index} className={msg.role}>{msg.content.split('JSONdata')[0].trim()}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Structure;
