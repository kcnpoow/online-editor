class BaseApi {
  private baseUrl = 'http://localhost:8080';
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async get(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${this.apiUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async post(
    endpoint: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${this.apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  async put(
    endpoint: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${this.apiUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  async delete(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${this.apiUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}

export default BaseApi;
