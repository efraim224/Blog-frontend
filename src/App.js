import './App.css';
import Contact from './pages/Contact'
import About from './pages/About';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NewPost from './pages/NewPost';
import Layout from './components/Layout'
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { AuthProvider } from './providers/AuthProvider';
import MyPosts from './pages/MyPosts';



function App() {
  return (
    <>
      <div className="App">
        <div className="grid-container">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/add' element={<NewPost />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/posts/:id' element={<Post />} />
                <Route path='/myposts' element={<MyPosts />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </>
  );
}

export default App;
