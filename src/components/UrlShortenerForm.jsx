import { useState } from 'react';
import axios from 'axios';

const UrlShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/url/shorten`, { longUrl }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShortUrl(response.data.shortUrl);
      setMessage('URL shortened successfully!');
    } catch (error) {
      console.error('URL Shortening failed:', error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Shorten URL</h2>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      <form onSubmit={handleShortenUrl} className="flex flex-col">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="border p-2 mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <div className="mt-4">
          <p>Short URL:</p>
          <a href={`${import.meta.env.VITE_FRONTEND_URL}/${shortUrl}`} className="text-blue-500">
            {`${import.meta.env.VITE_FRONTEND_URL}/${shortUrl}`}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerForm;
