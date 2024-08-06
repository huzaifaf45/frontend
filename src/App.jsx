import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import AddProducts from './pages/AddProducts'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      

      setTimeout(() => {
        const user = localStorage.getItem('user');
        if (user) {
          setIsAuthenticated(true);
          navigate('/');
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
        setIsLoading(false);
      }, 1000); 
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <Loader /> ; 
  }

  return (
    <main >

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
      />

      <Routes>

        <Route path='/' element={<AddProducts />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </main>
  )
}

export default App
