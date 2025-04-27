class BaseApi {
  private baseUrl = 'http://localhost:8080';
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private buildHeaders(
    customHeaders: Record<string, string> = {}
  ): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private buildUrl(endpoint?: string): string {
    let url = `${this.baseUrl}${this.apiUrl}`;
    if (endpoint) {
      if (!endpoint.startsWith('/')) {
        url += '/';
      }
      url += endpoint;
    }
    return url;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type');

    // Check if there is any body to parse
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    // No body or non-JSON body → return null
    return null;
  }

  async get(
    endpoint: string = '',
    headers: Record<string, string> = {}
  ): Promise<any> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'GET',
        headers: this.buildHeaders(headers),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async post(body: any): Promise<any>;
  async post(endpoint: string, body: any): Promise<any>;
  async post(arg1: string | any, arg2?: any): Promise<any> {
    const [endpoint, body] =
      typeof arg1 === 'string' ? [arg1, arg2] : ['', arg1];

    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'POST',
        headers: this.buildHeaders(),
        body: JSON.stringify(body),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  async put(body: any): Promise<any>;
  async put(endpoint: string, body: any): Promise<any>;
  async put(arg1: string | any, arg2?: any): Promise<any> {
    const [endpoint, body] =
      typeof arg1 === 'string' ? [arg1, arg2] : ['', arg1];

    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'PUT',
        headers: this.buildHeaders(),
        body: JSON.stringify(body),
      });

      return await this.handleResponse(response);
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
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'DELETE',
        headers: this.buildHeaders(headers),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}

export default BaseApi;
