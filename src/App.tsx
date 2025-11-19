import './App.css'
import { BrowserRouter } from 'react-router'
import RoutesSetup from './routes/RoutesSetup'
import { useState, useEffect } from 'react'
import { auth } from './firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <div>로1딩</div>;
  }
  return (
    <div className='App'>
      {!user ?
        (
          <div>
            <a>넌 로1그인이나 해라</a>
          </div>
        ) : (
          <BrowserRouter>
            <RoutesSetup />
          </BrowserRouter>
        )
      }
    </div>
  )
}

export default App
