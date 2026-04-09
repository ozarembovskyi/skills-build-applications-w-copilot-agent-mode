import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Workouts fetched data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
      <h2>Workouts</h2>
      <p className="text-muted">Endpoint: {endpoint}</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul>
        {workouts.map((workout, idx) => (
          <li key={workout.id || idx}>{JSON.stringify(workout)}</li>
        ))}
      </ul>
      {!error && workouts.length === 0 ? <p>No workouts found.</p> : null}
      </div>
    </div>
  );
};

export default Workouts;
