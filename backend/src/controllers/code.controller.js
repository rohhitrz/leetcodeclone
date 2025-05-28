// import judge0 from '../libs/judge0.js';

// // Execute code using Judge0
// export const executeCode = async (req, res) => {
//   try {
//     const { code, language, input } = req.body;

//     if (!code || !language) {
//       return res.status(400).json({
//         success: false,
//         message: 'Code and language are required'
//       });
//     }

//     // Submit code to Judge0
//     const submission = await judge0.submitCode(code, language, input);

//     // Get the submission token
//     const { token } = submission;

//     // Return the token immediately
//     res.status(202).json({
//       success: true,
//       message: 'Code submitted successfully',
//       token
//     });
//   } catch (error) {
//     console.error('Error executing code:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error executing code',
//       error: error.message
//     });
//   }
// };

// // Get code execution result
// export const getExecutionResult = async (req, res) => {
//   try {
//     const { token } = req.params;

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: 'Submission token is required'
//       });
//     }

//     // Get submission result with polling
//     const result = await judge0.getSubmissionWithPolling(token);

//     res.status(200).json({
//       success: true,
//       result
//     });
//   } catch (error) {
//     console.error('Error getting execution result:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error getting execution result',
//       error: error.message
//     });
//   }
// };

// // Get supported languages
// export const getSupportedLanguages = async (req, res) => {
//   try {
//     const languages = await judge0.getSupportedLanguages();
    
//     res.status(200).json({
//       success: true,
//       languages
//     });
//   } catch (error) {
//     console.error('Error getting supported languages:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error getting supported languages',
//       error: error.message
//     });
//   }
// }; 