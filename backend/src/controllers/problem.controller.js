import { db } from "../libs/db.js";
import { getJudge0LanguageId,submitBatch } from "../libs/judge0.lib.js";
export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constarints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ error: "you are not allowed to create a problem" });
  }
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `this language ${language} is not supported` });
      }

      const submission = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_Id: languageId,
        stdin: input,
        expected_output: output,
      }));
      const submissionResults = await submitBatch(submission);
      const tokens = submissionResults.map((res) => res.token);

      const  results= await pollBatchResults(tokens);

    }
  } catch (error) {
    console.error(error);
  }
};
export const getProblems = async (req, res) => {};
export const getProblembyId = async (req, res, id) => {};
export const updateProblembyId = async (req, res, id) => {};
export const deleteProblembyId = async (req, res, id) => {};
export const getAllProblemsSolvedByUser = async (req, res, id) => {};
