export const apiRoutes = {
  register: `${import.meta.env.VITE_API_BASE_URL || ""}/api/user/register`,
  google: `${import.meta.env.VITE_API_BASE_URL || ""}/api/auth/google`,
  signIn: `${import.meta.env.VITE_API_BASE_URL || ""}/api/auth/login`,
  getCurrentUser: `${import.meta.env.VITE_API_BASE_URL || ""}/api/user/me`,
  validateToken: `${import.meta.env.VITE_API_BASE_URL || ""}/api/user/validate-token`,
  logout: `${import.meta.env.VITE_API_BASE_URL || ""}/api/user/logout`,
  Hotels: `${import.meta.env.VITE_API_BASE_URL || ""}/api/hotels/my-hotels`,
  searchHotels: `${import.meta.env.VITE_API_BASE_URL || ""}/api/hotelSearch`,
};
