import React, { useEffect, useState } from 'react';
import '.././utils/Structure.css';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [messages, setMessages] = useState([]);
  const [displayMessage, setDisplayMessage] = useState('Click "Send Query" for a response.'); // Initial message
  const postText = "Explain in detail about company financial data";

  useEffect(() => {
    fetch('http://localhost:4000/company')
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSendMessage = async () => {
    setDisplayMessage("Awating Response...")
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
        return;
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || "No response from API";

      setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: assistantMessage }]);
      console.log(assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Revenue</th>
            <th>Gross Profit</th>
            <th>Operating Income</th>
            <th>Pre-tax Income</th>
            <th>Income After Taxes</th>
            <th>Income from Continuous Operations</th>
            <th>Net Income</th>
            <th>Basic EPS</th>
            <th>EPS</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.Year}</td>
              <td>{company.Revenue}</td>
              <td>{company.Gross_profit}</td>
              <td>{company.operating_income}</td>
              <td>{company.pre_tax_income}</td>
              <td>{company.income_after_taxes}</td>
              <td>{company.income_from_continuous_operations}</td>
              <td>{company.net_income}</td>
              <td>{company.basic_eps}</td>
              <td>{company.eps}</td>
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
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <p key={index} className={msg.role}>{msg.content.split('JSONdata')[0].trim()}</p>
            ))
          ) : (
            <p>{displayMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Companies;
