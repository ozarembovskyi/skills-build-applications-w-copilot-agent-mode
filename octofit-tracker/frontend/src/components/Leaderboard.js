import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Leaderboard fetched data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setLeaders(results);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
      <h2>Leaderboard</h2>
      <p className="text-muted">Endpoint: {endpoint}</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul>
        {leaders.map((leader, idx) => (
          <li key={leader.id || idx}>{JSON.stringify(leader)}</li>
        ))}
      </ul>
      {!error && leaders.length === 0 ? <p>No leaderboard data found.</p> : null}
      </div>
    </div>
  );
};

export default Leaderboard;
