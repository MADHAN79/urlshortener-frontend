import { useEffect, useState } from 'react';
import axios from 'axios';

const UrlTable = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/url`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUrls(response.data.urls);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Your Shortened URLs</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Short URL</th>
            <th className="border px-4 py-2">Original URL</th>
            <th className="border px-4 py-2">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td className="border px-4 py-2">
                <a href={`${import.meta.env.VITE_FRONTEND_URL}/${url.shortCode}`} className="text-blue-500">
                  {`${import.meta.env.VITE_FRONTEND_URL}/${url.shortCode}`}
                </a>
              </td>
              <td className="border px-4 py-2">
                <a href={url.longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {url.longUrl}
                </a>
              </td>
              <td className="border px-4 py-2">{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
