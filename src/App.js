import './App.css';
import Contact from './components/Contact'
import About from './components/About';
import PostContainer from './components/PostContainer';
import { Routes, Route } from 'react-router-dom';
import NewPostForm from './components/NewPostForm';
import Layout from './components/Layout'
 


function App() {
  return (
    <>
      <div className="App">
        <div class="grid-container">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index path="/home" element={<PostContainer/>}/>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/posts/add' element={<NewPostForm/>}/>
              </Route>
            </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
