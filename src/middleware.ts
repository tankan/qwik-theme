import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = async ({ request, next, headers }: RequestEvent) => {
  // 基本安全头
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 权限策略
  headers.set('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );
  
  // CORS 配置
  const origin = request.headers.get('Origin');
  const allowedOrigins = ['http://localhost:5173', 'https://yourdomain.com'];
  
  if (origin && allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }
  
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // 内容安全策略
  headers.set('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
    connect-src 'self';
    manifest-src 'self';
    worker-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self'
  `.replace(/\s+/g, ' ').trim());

  try {
    // 简单的请求限制
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const requestCount = getRequestCount(clientIP);
    
    if (requestCount > 100) {
      throw new Error('Too Many Requests');
    }

    if (request.method === 'POST' && !request.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Unsupported Media Type');
    }

    await next();

  } catch (error: any) {
    // 错误处理
    console.error('Request error:', error);
    
    if (error.status === 404) {
      headers.set('Cache-Control', 'no-store');
    }

    throw new Error(error.message || 'Internal Server Error');
  }
};

// 简单的内存请求计数器
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function getRequestCount(clientIP: string): number {
  const now = Date.now();
  const minute = 60 * 1000;
  const data = requestCounts.get(clientIP);

  if (!data || now - data.timestamp > minute) {
    requestCounts.set(clientIP, { count: 1, timestamp: now });
    return 1;
  }

  data.count++;
  return data.count;
} 