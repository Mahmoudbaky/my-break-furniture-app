# Frontend Refresh Token Implementation Examples

This document provides examples of how to handle token refresh in your frontend application.

## API Endpoint

**POST** `/api/auth/refresh`

**Headers:**
```
Authorization: Bearer <your-current-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "username": "johndoe",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

---

## Example 1: Basic Fetch Implementation

```javascript
// services/authService.js

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

export const refreshToken = async () => {
  const currentToken = localStorage.getItem('token'); // or however you store the token
  
  if (!currentToken) {
    throw new Error('No token available');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    
    // Update token in storage
    localStorage.setItem('token', data.token);
    
    return data;
  } catch (error) {
    console.error('Token refresh error:', error);
    // Redirect to login or handle error
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw error;
  }
};
```

---

## Example 2: Axios with Interceptor (Recommended)

This approach automatically refreshes the token when a request fails due to an expired token.

```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor - adds token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentToken = localStorage.getItem('token');

      try {
        // Try to refresh the token
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          }
        );

        const { token } = response.data;
        localStorage.setItem('token', token);

        // Process queued requests
        processQueue(null, token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

**Usage:**
```javascript
import api from './services/api';

// Use it like a normal axios instance
api.get('/products')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Example 3: React Hook with Automatic Refresh

```javascript
// hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:3000/api';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshToken = useCallback(async () => {
    const currentToken = localStorage.getItem('token');
    
    if (!currentToken || isRefreshing) {
      return null;
    }

    setIsRefreshing(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return data.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      // Redirect to login
      window.location.href = '/login';
      return null;
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  // Auto-refresh token before it expires (e.g., 5 minutes before)
  useEffect(() => {
    if (!token) return;

    // Check token expiration (simplified - you might want to decode JWT)
    const refreshInterval = setInterval(() => {
      refreshToken();
    }, 19 * 60 * 60 * 1000); // Refresh every 19 hours (if token expires in 24h)

    return () => clearInterval(refreshInterval);
  }, [token, refreshToken]);

  return {
    token,
    user,
    refreshToken,
    isRefreshing,
  };
};
```

---

## Example 4: Manual Refresh on Button Click

```javascript
// components/RefreshTokenButton.jsx
import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:3000/api';

const RefreshTokenButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRefresh = async () => {
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Token refreshed successfully!');
      } else {
        setMessage('Failed to refresh token');
      }
    } catch (error) {
      setMessage('Error refreshing token');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Token'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RefreshTokenButton;
```

---

## Example 5: TypeScript with Axios Interceptor

```typescript
// services/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

interface RefreshTokenResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    email: string;
    username: string;
    phone: string;
    role: string;
  };
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: string) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || undefined);
    }
  });
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentToken = localStorage.getItem('token');

      try {
        const response = await axios.post<RefreshTokenResponse>(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          }
        );

        const { token } = response.data;
        localStorage.setItem('token', token);
        processQueue(null, token);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

## Best Practices

1. **Store tokens securely**: Use `localStorage` for web apps, but consider `httpOnly` cookies for better security.

2. **Handle token expiration**: Check token expiration before making requests or use interceptors to handle 401 errors automatically.

3. **Prevent multiple refresh calls**: Use a flag (`isRefreshing`) to prevent multiple simultaneous refresh requests.

4. **Queue failed requests**: When refreshing, queue failed requests and retry them after getting a new token.

5. **Logout on refresh failure**: If token refresh fails, clear stored tokens and redirect to login.

6. **Update token everywhere**: Make sure to update the token in your state management (Redux, Context, etc.) when it's refreshed.

---

## Testing the Endpoint

You can test the refresh endpoint using curl:

```bash
# Replace YOUR_TOKEN with an actual token
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

Or using Postman/Insomnia:
- Method: POST
- URL: `http://localhost:3000/api/auth/refresh`
- Headers: `Authorization: Bearer <your-token>`

