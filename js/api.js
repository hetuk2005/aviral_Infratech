/**
 * MERN-Compatible API Service Layer
 * Automatically fetches from Express/MongoDB when USE_REMOTE_API is true,
 * and falls back cleanly to local structured data for pure frontend mode.
 */
window.AviralAPI = (() => {
  const cfg = window.AVIRAL_CONFIG;
  const db = window.AVIRAL_DATA;

  async function request(endpoint, options = {}) {
    if (!cfg.USE_REMOTE_API) {
      return null;
    }
    const response = await fetch(`${cfg.API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }
    return response.json();
  }

  return {
    async getLands() {
      const remote = await request('/lands').catch(() => null);
      return remote || db.lands;
    },

    async getPlans(type = 'plots') {
      const remote = await request(`/plans?type=${encodeURIComponent(type)}`).catch(() => null);
      if (remote) return remote;
      return type === 'payment' ? db.paymentPlans : db.plotPlans;
    },

    async getLayoutPlots() {
      const remote = await request('/layout/aviral-enclave-banthra').catch(() => null);
      return remote || db.layoutPlots;
    },

    async getReels() {
      const remote = await request('/reels').catch(() => null);
      return remote || db.reels;
    },

    async submitInquiry(payload) {
      if (cfg.USE_REMOTE_API) {
        return request('/inquiries', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      // Frontend-only persistence in localStorage so leads are retained locally during demo
      const existing = JSON.parse(localStorage.getItem('aviral_inquiries') || '[]');
      const record = {
        ...payload,
        id: `INQ-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      existing.unshift(record);
      localStorage.setItem('aviral_inquiries', JSON.stringify(existing));
      return { success: true, mode: 'local-preview', data: record };
    }
  };
})();
