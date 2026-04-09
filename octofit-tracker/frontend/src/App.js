

import logo from './logo.svg';
import octofitLogo from '../public/octofitapp-small.png';



function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded mb-4">
          <div className="container-fluid">
            <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/">
              <img src={process.env.PUBLIC_URL + '/octofitapp-small.png'} alt="OctoFit Logo" style={{height: '40px', marginRight: '12px'}} />
              OctoFit Tracker
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
