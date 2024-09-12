


import React, { useEffect, useState } from 'react';
import './Structure.css';
import LoadingPage from './LoadingPage';

function Structure() {
  const [countries, setCountries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialText, setInitialText] = useState(true);
  const postText = "I have healthcare table it have column i want detail summary of the table?";
  
  useEffect(() => {
    fetch('http://localhost:4000/healthcare')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setTimeout(() => {
          handleSendMessage();
        }, 3000);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
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

      // Remove double asterisks, single asterisks, and replace newline characters with HTML line breaks
      const formattedMessage = assistantMessage
        .replace(/\*\*/g, '')  // Remove double asterisks
        .replace(/\*/g, '')  // Remove single asterisks
        .replace(/\n/g, '<br />');  // Replace newlines with <br />

      setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: formattedMessage }]);
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
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Type</th>
            <th>Medical Condition</th>
            <th>Doctor</th>
            <th>Billing Amount</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.name}</td>
              <td>{country.age}</td>
              <td>{country.gender}</td>
              <td>{country.blood_type}</td>
              <td>{country.medical_condition}</td>
              <td>{country.doctor}</td>
              <td>{country.billing_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-right">
        <div className='response-text'>
          {loading ? (
            <LoadingPage />
          ) : initialText ? (
            <p></p>
          ) : (
            messages
              .filter(msg => msg.role === 'assistant')
              .map((msg, index) => (
                <p key={index} className='formatted-message' dangerouslySetInnerHTML={{ __html: msg.content.split('JSONdata')[0].trim().split("Source file: countries.csv")[0].trim() }}></p>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Structure;



