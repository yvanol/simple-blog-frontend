import { Sparkles, PenTool, LayoutGrid } from 'lucide-react';

export default function Navbar({ setView }) {
  return (
    <nav className="sticky top-0 z-50 glassmorphism px-6 py-4 mx-4 my-4 rounded-2xl flex justify-between items-center max-w-6xl md:mx-auto">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
        <Sparkles className="text-blue-500 animate-pulse" />
        <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
          VORTEX BLOG
        </span>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setView('home')} 
          className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all text-sm font-medium"
        >
          <LayoutGrid size={16} /> Feeds
        </button>
        <button 
          onClick={() => setView('create')} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm font-medium"
        >
          <PenTool size={16} /> Write Blog
        </button>
      </div>
    </nav>
  );
}