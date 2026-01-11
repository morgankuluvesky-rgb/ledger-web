// API Configuration
// In development: uses localhost with dynamic hostname
// In production: uses VITE_API_URL environment variable

const getApiUrl = () => {
    // Check for production environment variable first
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // Development fallback - use current hostname with port 5001
    return `http://${window.location.hostname}:5001/api`;
};

export const API_URL = getApiUrl();

export default API_URL;
