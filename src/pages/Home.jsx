import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

export default function Home({ onSelectBlog }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to load articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
          Explore Human <span className="bg-linear-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">Perspectives</span>
        </h1>
        <p className="text-gray-400 max-w-xl">Dive into clean insights, technical breakdowns, and immersive stories written by developers globally.</p>
      </header>

      {blogs.length === 0 ? (
        <div className="glassmorphism p-12 text-center rounded-2xl">
          <p className="text-gray-400">No content found. Be the first to draft a story!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onClick={() => onSelectBlog(blog._id)} />
          ))}
        </div>
      )}
    </main>
  );
}