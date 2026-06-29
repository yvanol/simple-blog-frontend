import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';

export default function BlogCard({ blog, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="glassmorphism rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full group"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Calendar size={12} />
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {blog.snippet}
        </p>
        <div className="flex items-center gap-1 text-sm font-semibold text-blue-400 group-hover:text-pink-400 transition-colors mt-auto">
          Read Story <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}