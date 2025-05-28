// import axios from 'axios';

// const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'http://localhost:2358';

// // Language IDs based on Judge0 supported languages
// // These are common languages, add more as needed
// const LANGUAGE_IDS = {
//   javascript: 93,   // Node.js
//   python: 71,       // Python 3
//   java: 91,         // JDK 17
//   cpp: 54,          // C++ GCC 11.2.0
//   c: 50,            // C GCC 11.2.0
//   csharp: 51,       // C# Mono 6.12.0
//   ruby: 72,         // Ruby 3.0.0
//   go: 60,           // Go 1.16.2
//   rust: 73,         // Rust 1.50.0
// };

// /**
//  * Submit code for execution
//  * @param {string} sourceCode - The source code to execute
//  * @param {number|string} languageId - The language ID or key
//  * @param {string} stdin - Standard input
//  * @param {object} options - Additional options
//  * @returns {Promise} - Submission token
//  */
// export const submitCode = async (sourceCode, languageId, stdin = '', options = {}) => {
//   // Convert language key to ID if a string is provided
//   if (typeof languageId === 'string' && LANGUAGE_IDS[languageId]) {
//     languageId = LANGUAGE_IDS[languageId];
//   }

//   try {
//     const response = await axios.post(`${JUDGE0_API_URL}/submissions`, {
//       source_code: sourceCode,
//       language_id: languageId,
//       stdin,
//       ...options
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error submitting code to Judge0:', error);
//     throw error;
//   }
// };

// /**
//  * Get submission result
//  * @param {string} token - Submission token
//  * @returns {Promise} - Submission result
//  */
// export const getSubmission = async (token) => {
//   try {
//     const response = await axios.get(`${JUDGE0_API_URL}/submissions/${token}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error getting submission result from Judge0:', error);
//     throw error;
//   }
// };

// /**
//  * Get submission result with polling (for when the result is not immediately available)
//  * @param {string} token - Submission token
//  * @param {number} interval - Polling interval in milliseconds (default: 1000ms)
//  * @param {number} timeout - Maximum time to wait in milliseconds (default: 10000ms)
//  * @returns {Promise} - Submission result
//  */
// export const getSubmissionWithPolling = async (token, interval = 1000, timeout = 10000) => {
//   const startTime = Date.now();
  
//   while (Date.now() - startTime < timeout) {
//     const result = await getSubmission(token);
    
//     // If the submission is finished, return the result
//     if (result.status && (result.status.id >= 3)) {
//       return result;
//     }
    
//     // Wait for the specified interval
//     await new Promise(resolve => setTimeout(resolve, interval));
//   }
  
//   throw new Error('Submission polling timed out');
// };

// /**
//  * Get supported languages from Judge0
//  * @returns {Promise} - List of supported languages
//  */
// export const getSupportedLanguages = async () => {
//   try {
//     const response = await axios.get(`${JUDGE0_API_URL}/languages`);
//     return response.data;
//   } catch (error) {
//     console.error('Error getting supported languages from Judge0:', error);
//     throw error;
//   }
// };

// export default {
//   submitCode,
//   getSubmission,
//   getSubmissionWithPolling,
//   getSupportedLanguages,
//   LANGUAGE_IDS
// }; 