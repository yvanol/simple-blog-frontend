import { useState } from 'react';
import axios from 'axios';
import { ImagePlus, Loader2 } from 'lucide-react';

export default function CreateBlog({ setView }) {
  const [formData, setFormData] = useState({ title: '', snippet: '', content: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadAndSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert('Please upload a cover image');
    setIsSubmitting(true);

    try {
      // 1. Fetch secure signature configurations from Backend
      const { data: config } = await axios.get(`${import.meta.env.VITE_API_URL}/upload/signature`);

      // 2. Prepare Form Data packet for direct Cloudinary deployment
      const cloudData = new FormData();
      cloudData.append('file', imageFile);
      cloudData.append('api_key', config.apiKey);
      cloudData.append('timestamp', config.timestamp);
      cloudData.append('signature', config.signature);
      cloudData.append('folder', 'blog_covers');

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
        cloudData
      );
      
      const secureUrl = cloudRes.data.secure_url;

      // 3. Dispatch data object directly into MongoDB
      await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, {
        ...formData,
        coverImage: secureUrl
      });

      setView('home');
    } catch (err) {
      console.error("Error creating post", err);
      alert('Upload or creation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="glassmorphism p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Create New Article</h2>
        <form onSubmit={handleUploadAndSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
            <label className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/20 group transition-colors">
              <ImagePlus className="text-gray-500 group-hover:text-blue-400 mb-2" size={32} />
              <span className="text-sm text-gray-400">{imageFile ? imageFile.name : 'Select blog cover image'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input type="text" required className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Catchy headline" onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Snippet</label>
            <input type="text" required className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Brief context summary" onChange={(e) => setFormData({...formData, snippet: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
            <textarea rows={8} required className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Write your full story here..." onChange={(e) => setFormData({...formData, content: e.target.value})} />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer flex justify-center items-center gap-2">
            {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Publishing...</> : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
}