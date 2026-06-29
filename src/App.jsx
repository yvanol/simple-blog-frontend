import { useState } from 'react';
import Navbar from './components/Navbar';
import Floating3D from './components/Floating3D';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'create' | 'details'
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleSelectBlog = (id) => {
    setSelectedBlogId(id);
    setView('details');
  };

  return (
    <div className="relative min-h-screen pb-16 antialiased">
      {/* Immersive 3D Interactive WebGL Layer */}
      <Floating3D />
      
      {/* Fixed Application Controls */}
      <Navbar setView={setView} />

      {/* Content Rendering Switcher */}
      {view === 'home' && <Home onSelectBlog={handleSelectBlog} />}
      {view === 'create' && <CreateBlog setView={setView} />}
      {view === 'details' && <BlogDetails blogId={selectedBlogId} setView={setView} />}
    </div>
  );
}