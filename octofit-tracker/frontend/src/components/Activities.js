import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Activities fetched data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        <p className="text-muted">Endpoint: {endpoint}</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Activity</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.id || idx + 1}</td>
                  <td>{activity.name || activity.type || '-'}</td>
                  <td><pre className="mb-0 small">{JSON.stringify(activity, null, 2)}</pre></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="text-center">No activities found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
