// API Client for Neura Coin Backend

const API_URL = import.meta.env.DEV 
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
  : 'https://neura-coin.onrender.com/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('neura_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('neura_token', token);
  }

  async request(endpoint, method = 'GET', data = null) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const json = await response.json();
      
      if (!response.ok) {
        throw new Error(json.error || 'API Error');
      }
      
      return json;
    } catch (error) {
      console.error(`API Error on ${endpoint}:`, error);
      throw error;
    }
  }

  // Auth
  authenticate(initData, user) {
    return this.request('/auth/telegram', 'POST', { initData, user });
  }

  // User details
  getUser() {
    return this.request('/user', 'GET');
  }

  // Gameplay
  tap() {
    return this.request('/tap', 'POST');
  }

  // Machines
  buyMachine(machineId) {
    return this.request('/machine/buy', 'POST', { machineId });
  }

  upgradeMachine(machineId) {
    return this.request('/machine/upgrade', 'POST', { machineId });
  }

  claimMachines() {
    return this.request('/machine/claim', 'POST');
  }

  // Upgrades
  listUpgrades() {
    return this.request('/upgrade/list', 'GET');
  }

  buyUpgrade(upgradeId) {
    return this.request('/upgrade/buy', 'POST', { upgradeId });
  }

  // Missions
  getMissions() {
    return this.request('/missions', 'GET');
  }

  completeMission(missionId) {
    return this.request('/missions/complete', 'POST', { missionId });
  }
}

export const api = new ApiClient();
