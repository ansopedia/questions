// General errors
export const TIMEOUT_ERROR = 'Request timed out. Please try again later.';
export const INTERNAL_SERVER_ERROR =
  'An unexpected error occurred. Please try again later.';
export const NETWORK_ERROR =
  'Network error occurred. Please check your internet connection.';
export const INVALID_REQUEST_FORMAT =
  'Invalid request format. Please check your request data.';
export const RESOURCE_NOT_FOUND_ERROR =
  'Resource not found. Please verify the URL and try again.';
export const FORBIDDEN_ERROR =
  'Access forbidden. You do not have permission to access this resource.';

// Authentication error;
export const TOKEN_MISSING_ERROR =
  'Authentication token missing. Please log in to continue.';
export const TOKEN_EXPIRED_ERROR =
  'Your session has expired. Please log in again to continue.';
export const PASSWORD_RESET_REQUIRED_ERROR =
  'Password reset required. Please check your email for instructions.';
export const TOKEN_INVALID_ERROR =
  'authentication token is either invalid or has been tampered with. Please try logging in again.';

// Authorization error;
export const UNAUTHORIZED_ERROR =
  'Unauthorized access. Please ensure you are logged in.';
export const INSUFFICIENT_PERMISSIONS_ERROR =
  'You do not have sufficient permissions to perform this action.';

// Input validation error;

export const MISSING_REQUIRED_FIELD_ERROR =
  'Please fill in all required fields.';
export const INVALID_DATE_FORMAT_ERROR =
  'Invalid date format. Please enter a valid date.';
export const INVALID_PHONE_NUMBER_ERROR =
  'Invalid phone number format. Please enter a valid phone number.';
