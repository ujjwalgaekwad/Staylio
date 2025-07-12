const BASE_URL = import.meta.env.VITE_API_BASE_URL!;

export const apiRoutes = {
  register: `${BASE_URL}/api/user/register`,
  google: `${BASE_URL}/api/auth/google`,
  signIn: `${BASE_URL}/api/auth/login`,
  getCurrentUser: `${BASE_URL}/api/user/me`,
  validateToken: `${BASE_URL}/api/user/validate-token`,
  logout: `${BASE_URL}/api/user/logout`,
  Hotels: `${BASE_URL}/api/hotels/my-hotels`,
  searchHotels: `${BASE_URL}/api/hotelSearch`,
};
