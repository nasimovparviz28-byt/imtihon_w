import 'dotenv/config';
import app from '../server/app.js';
import { connectToMongo } from '../server/database.js';

function getRequestPath(req) {
  const requestUrl = new URL(req.url || '/', 'http://vercel.local');
  if (requestUrl.pathname === '/api/index' && requestUrl.searchParams.has('path')) {
    const apiPath = requestUrl.searchParams.get('path') || '';
    requestUrl.searchParams.delete('path');
    const query = requestUrl.searchParams.toString();
    return { pathname: `/api/${apiPath}`, query };
  }
  const query = requestUrl.searchParams.toString();
  return { pathname: requestUrl.pathname, query };
}

export default async function handler(req, res) {
  const { pathname, query } = getRequestPath(req);
  req.url = `${pathname}${query ? `?${query}` : ''}`;

  if (pathname !== '/api/courses') {
    try {
      await connectToMongo();
    } catch (error) {
      console.error('Vercel API could not connect to MongoDB:', error.message);
      return res.status(503).json({ message: 'MongoDB bazasiga ulanib bo‘lmadi. Vercel Environment Variables va Atlas IP ruxsatini tekshiring.' });
    }
  }

  return app(req, res);
}
