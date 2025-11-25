# API Integration Examples

This document provides examples of how to integrate various APIs into your project.

## 🌐 Free Public APIs

Here are some free APIs you can use for your project:

### General Purpose

- **JSONPlaceholder** - https://jsonplaceholder.typicode.com/
  - Fake REST API for testing
- **Open Trivia Database** - https://opentdb.com/
  - Trivia questions API
- **REST Countries** - https://restcountries.com/
  - Country information

### Weather & Environment

- **Open-Meteo** - https://open-meteo.com/
  - Free weather API (no API key required)
- **AirVisual** - https://www.iqair.com/air-pollution-data-api
  - Air quality data

### News & Content

- **NewsAPI** - https://newsapi.org/
  - News articles (requires API key)
- **The Guardian API** - https://open-platform.theguardian.com/
  - Guardian news content

### Entertainment

- **OMDb API** - http://www.omdbapi.com/
  - Movie database
- **Spotify API** - https://developer.spotify.com/
  - Music data (requires authentication)
- **Marvel API** - https://developer.marvel.com/
  - Marvel characters and comics

### Food & Recipes

- **TheMealDB** - https://www.themealdb.com/api.php
  - Free recipe API (no daily limits, test key: '1')
  - Search recipes, random meals, ingredient filtering
  - **Currently used in this project**

### Iceland-Specific

- **Apis.is** - https://apis.is/
  - Collection of Icelandic APIs (weather, currency, etc.)
- **Vegagerðin** - https://api.vegagerdin.is/
  - Road conditions in Iceland

## 📝 Example Implementations

### Example 1: Fetching Weather Data (Open-Meteo)

**Type Definition:**

```typescript
// src/types/weather.ts
export interface WeatherData {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
}
```

**API Service:**

```typescript
// src/services/weatherService.ts
import type { WeatherData } from "../types/weather";

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }

  return response.json();
}
```

**Component Usage:**

```typescript
// src/components/Weather.tsx
import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import type { WeatherData } from "../types/weather";

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Reykjavik coordinates
        const data = await getWeather(64.1466, -21.9426);
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
      <p className="text-4xl font-bold">
        {weather.current_weather.temperature}°C
      </p>
      <p className="text-gray-600">
        Wind: {weather.current_weather.windspeed} km/h
      </p>
    </div>
  );
}
```

### Example 2: Using the Custom useFetch Hook

```typescript
// src/pages/PostsPage.tsx
import { useFetch } from "../hooks/useFetch";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export function PostsPage() {
  const { data, loading, error, refetch } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error.message}</p>
          <button
            onClick={refetch}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid gap-4">
        {data?.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### Example 3: API with Query Parameters

```typescript
// src/services/movieService.ts
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export async function searchMovies(
  query: string,
  apiKey: string
): Promise<MovieSearchResponse> {
  const url = new URL("https://www.omdbapi.com/");
  url.searchParams.append("apikey", apiKey);
  url.searchParams.append("s", query);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}
```

### Example 4: POST Request with JSON

```typescript
// src/services/postService.ts
interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

interface Post extends CreatePostData {
  id: number;
}

export async function createPost(postData: CreatePostData): Promise<Post> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

// Usage in component
import { useState } from "react";
import { createPost } from "../services/postService";

export function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newPost = await createPost({
        title,
        body,
        userId: 1,
      });
      console.log("Created post:", newPost);
      // Handle success (show message, redirect, etc.)
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-4 py-2 border rounded mb-4"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        className="w-full px-4 py-2 border rounded mb-4"
        rows={5}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

## 🔐 Environment Variables

For APIs that require keys, use environment variables:

1. **Create `.env` file** (add to .gitignore):

```env
VITE_OMDB_API_KEY=your_api_key_here
VITE_NEWS_API_KEY=your_news_api_key
```

2. **Access in code:**

```typescript
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

if (!apiKey) {
  throw new Error("API key not configured");
}
```

3. **Share with team:**
   - Create `.env.example` with placeholder values
   - Team members copy to `.env` and add their own keys
   - **Never commit `.env` to git**

## 🚨 Error Handling Best Practices

### Comprehensive Error Handling

```typescript
export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    // Check HTTP status
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Resource not found");
      }
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Network errors
    if (error instanceof TypeError) {
      throw new Error("Network error. Please check your connection.");
    }
    // Re-throw other errors
    throw error;
  }
}
```

## 💡 Tips

1. **Rate Limiting**: Many free APIs have rate limits. Cache responses when possible.
2. **Loading States**: Always show loading indicators for better UX.
3. **Error Messages**: Display user-friendly error messages.
4. **TypeScript**: Always define types for API responses.
5. **Testing**: Test with different network conditions (slow, offline).
6. **Documentation**: Document which APIs you're using and why.

## 📚 Resources

- [Public APIs List](https://github.com/public-apis/public-apis)
- [APIs.is Documentation](https://apis.is/)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

Happy coding! 🚀




