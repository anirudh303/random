/**
 * array of routes accessible to public
 * these  routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * array of routes for authentication
 * these  routes will redirect users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * prefix for api auth routes
 * routes that start wth this prefix is used for api  authentication
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default  redirect url after loggin in
 * @type {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
