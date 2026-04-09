import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Teams fetched data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
      <h2>Teams</h2>
      <p className="text-muted">Endpoint: {endpoint}</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul>
        {teams.map((team, idx) => (
          <li key={team.id || idx}>{JSON.stringify(team)}</li>
        ))}
      </ul>
      {!error && teams.length === 0 ? <p>No teams found.</p> : null}
      </div>
    </div>
  );
};

export default Teams;
