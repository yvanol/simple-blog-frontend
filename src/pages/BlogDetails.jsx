import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogDetails({ blogId, setView }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${blogId}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading story details...</div>;
  if (!blog) return <div className="text-center py-20 text-gray-400">Post not found.</div>;

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <button onClick={() => setView('home')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 cursor-pointer text-sm">
        <ArrowLeft size={16} /> Back to dashboard
      </button>
      <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
      </div>
      <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">{blog.title}</h1>
      <div className="glassmorphism p-8 rounded-2xl text-gray-200 leading-relaxed whitespace-pre-line text-lg">
        {blog.content}
      </div>
    </motion.article>
  );
}