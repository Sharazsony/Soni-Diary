import type { Poem, Movie, Book } from './types';

// Poem services
export const poemService = {
  async getAll(): Promise<Poem[]> {
    const response = await fetch('/api/poems');
    if (!response.ok) throw new Error('Failed to fetch poems');
    return response.json();
  },

  async getById(id: string): Promise<Poem> {
    const response = await fetch(`/api/poems/${id}`);
    if (!response.ok) throw new Error('Failed to fetch poem');
    return response.json();
  },

  async create(poem: Omit<Poem, 'id'>): Promise<Poem> {
    const response = await fetch('/api/poems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poem),
    });
    if (!response.ok) throw new Error('Failed to create poem');
    return response.json();
  },

  async update(id: string, poem: Partial<Poem>): Promise<Poem> {
    const response = await fetch(`/api/poems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poem),
    });
    if (!response.ok) throw new Error('Failed to update poem');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/poems/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete poem');
  },
};

// Movie services
export const movieService = {
  async getAll(): Promise<Movie[]> {
    const response = await fetch('/api/movies');
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  },

  async getById(id: string): Promise<Movie> {
    const response = await fetch(`/api/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return response.json();
  },

  async create(movie: Omit<Movie, 'id'>): Promise<Movie> {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error('Failed to create movie');
    return response.json();
  },

  async update(id: string, movie: Partial<Movie>): Promise<Movie> {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error('Failed to update movie');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete movie');
  },
};

// Book services
export const bookService = {
  async getAll(): Promise<Book[]> {
    const response = await fetch('/api/books');
    if (!response.ok) throw new Error('Failed to fetch books');
    return response.json();
  },

  async getById(id: string): Promise<Book> {
    const response = await fetch(`/api/books/${id}`);
    if (!response.ok) throw new Error('Failed to fetch book');
    return response.json();
  },

  async create(book: Omit<Book, 'id'>): Promise<Book> {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error('Failed to create book');
    return response.json();
  },

  async update(id: string, book: Partial<Book>): Promise<Book> {
    const response = await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error('Failed to update book');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete book');
  },
};

// Personal info services
export const personalInfoService = {
  async get(): Promise<Record<string, string>> {
    const response = await fetch('/api/personal');
    if (!response.ok) throw new Error('Failed to fetch personal info');
    return response.json();
  },

  async update(data: Record<string, string>): Promise<void> {
    const response = await fetch('/api/personal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update personal info');
  },
};

// Authentication services
export const authService = {
  async login(username: string, password: string): Promise<any> {
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    return response.json();
  },

  async createAdmin(): Promise<any> {
    const response = await fetch(`/api/auth/create-admin`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create admin');
    }
    
    return response.json();
  },
};

// Database seeding service
export const seedService = {
  async seedDatabase(): Promise<any> {
    const response = await fetch('/api/seed', {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to seed database');
    return response.json();
  },
};
