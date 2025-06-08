import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import { setupInterceptors } from './utils/api';
setupInterceptors();

function App() {

  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/user/:id" element={<UserDetailPage />} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
