import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Users fetched data:', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
      <h2>Users</h2>
      <p className="text-muted">Endpoint: {endpoint}</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul>
        {users.map((user, idx) => (
          <li key={user.id || idx}>{JSON.stringify(user)}</li>
        ))}
      </ul>
      {!error && users.length === 0 ? <p>No users found.</p> : null}
      </div>
    </div>
  );
};

export default Users;
