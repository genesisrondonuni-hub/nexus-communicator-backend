// Configuración de la API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Para incluir cookies de sesión
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la petición');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos de autenticación
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Métodos de perfil
  async updateProfile(profileData) {
    return this.request('/profile', {
      method: 'PUT',
      body: profileData,
    });
  }

  // Métodos de contactos
  async getContacts() {
    return this.request('/contacts');
  }

  async createContact(contactData) {
    return this.request('/contacts', {
      method: 'POST',
      body: contactData,
    });
  }

  async updateContact(contactId, contactData) {
    return this.request(`/contacts/${contactId}`, {
      method: 'PUT',
      body: contactData,
    });
  }

  async deleteContact(contactId) {
    return this.request(`/contacts/${contactId}`, {
      method: 'DELETE',
    });
  }

  // Métodos de campañas
  async getCampaigns() {
    return this.request('/campaigns');
  }

  async createCampaign(campaignData) {
    return this.request('/campaigns', {
      method: 'POST',
      body: campaignData,
    });
  }

  async updateCampaign(campaignId, campaignData) {
    return this.request(`/campaigns/${campaignId}`, {
      method: 'PUT',
      body: campaignData,
    });
  }

  async deleteCampaign(campaignId) {
    return this.request(`/campaigns/${campaignId}`, {
      method: 'DELETE',
    });
  }

  // Métodos de estadísticas
  async getStats() {
    return this.request('/stats');
  }
}

export default new ApiService();

