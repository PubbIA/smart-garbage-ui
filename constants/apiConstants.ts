// api.ts

export const API_URL: string = 'http://100.102.232.74:5000'; // Replace with your actual backend API URL

// Users
export const CHECK_EMAIL_EXIST_API: string = `${API_URL}/api/users/email-exist`;
export const GET_USER_BY_ACCESS_TOKEN_API: string = `${API_URL}/api/users/`;
export const CREATE_USER_API: string = `${API_URL}/api/users/`;
export const LOGIN_API: string = `${API_URL}/api/users/login`;
export const CHANGE_PASSWORD_API: string = `${API_URL}/api/users/change-password`;
export const UPDATE_LOCATION_API: string = `${API_URL}/api/users/update-location`;

// Email
export const SEND_VERIFICATION_CODE_API: string = `${API_URL}/api/email/send-verification-code`;

// Artificial Intelligence
export const GARBAGE_CLASSIFIER_API: string = `${API_URL}/api/ai/garbage-classifier`;
export const FACE_RECOGNITION_ALL_API: string = `${API_URL}/api/ai/face-recognition`;
export const FACE_RECOGNITION_CHECK_API: string = `${API_URL}/api/ai/face-recognition/check`;
export const RECYCLAGE_IDEA_API: string = `${API_URL}/api/ai/chat/recyclage`;
export const RANDOM_QUOTE_API: string = `${API_URL}/api/ai/chat/quote`;

// Cashback
export const ADD_POINTS_API: string = `${API_URL}/api/cashback/add`;
export const DEDUCT_POINTS_API: string = `${API_URL}/api/cashback/deduct`;

// Google Drive
export const UPLOAD_USER_PROFILE_API: string = `${API_URL}/api/google-drive/user-profile`;

// Robot
export const GET_ROBOT_BY_NAME_API: string = `${API_URL}/api/robots/`;
export const CREATE_ROBOT_API: string = `${API_URL}/api/robots/`;
export const UPDATE_ROBOT_POSITION_API: string = `${API_URL}/api/robots/update-position`;
export const GET_ALL_ROBOTS_API: string = `${API_URL}/api/robots/all`;
export const UPDATE_ROBOT_INFO_API: string = `${API_URL}/api/robots/update-info`;

// Robot Logs
export const GET_ALL_ROBOT_LOGS_API: string = `${API_URL}/api/robot-logs/all`;
export const GET_ROBOT_LOGS_BY_ID_API = (robotId: string): string => `${API_URL}/api/robot-logs/${robotId}`;

// Ranking
export const GET_ALL_USERS_RANKED_API: string = `${API_URL}/api/rank/`;

// Maps
export const GET_ROBOTS_NEAR_POINT_API: string = `${API_URL}/api/maps/`;



// Add more API URLs as needed
