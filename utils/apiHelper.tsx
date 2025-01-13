export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    try {
      const res = await fetch(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}), // Tambahkan custom headers jika ada
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      return await res.json();
    } catch (error) { 
      if (error instanceof Error) { 
        console.log(error)
        console.error('API Error:', error.message);
        throw error; 
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred.'); 
      } 
    }
  }