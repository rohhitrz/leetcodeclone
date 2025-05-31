import axios from "axios"
export const getJudge0LanguageId=(language)=>{
    const languageMap={
        "JAVA": 62,
        "JAVASCRIPT":63,
        "PYTHON":71
    }
    console.log(`the language is ${language} and its id is ${languageMap[language.toUpperCase()]}`);
    return languageMap[language.toUpperCase()];
}

// Map language IDs to their appropriate file extensions and names
export const getLanguageFileInfo = (languageId) => {
    const languageFileMap = {
        62: { extension: "java", className: "Main" }, // Java - needs a Main class
        63: { extension: "js", fileName: "script.js" }, // JavaScript
        71: { extension: "py", fileName: "script.py" }  // Python
    };
    return languageFileMap[languageId];
};

const sleep=(ms)=> new Promise((resolve)=>setTimeout(resolve,ms));

export const pollBatchResults=async (tokens)=>{
    while(true){
    const {data}=await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
        params:{
            tokens: tokens.join(","),
            base64_encoded:false,
        }
    })
    const results=data.submissions;

    const isAllDone=results.every((res)=>res.status.id !== 1 && res.status.id !== 2)
    if(isAllDone){
        return results;
    }
    await sleep(1000);
}
}

export const submitBatch=async(submissions)=>{
    console.log(`judge0 api url, ${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`);
    
    // Add appropriate file info to submissions based on language
    const processedSubmissions = submissions.map(submission => {
        const fileInfo = getLanguageFileInfo(submission.language_id);
        if (fileInfo) {
            if (fileInfo.fileName) {
                return { ...submission, script_name: fileInfo.fileName };
            } else if (fileInfo.extension === "java") {
                // For Java, we need to handle class name
                return { 
                    ...submission, 
                    script_name: `Main.java`
                };
            }
        }
        return submission;
    });
    
    const {data}=await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions: processedSubmissions
    })

    console.log("submission results", data);

    return data; // it will have tokens  [{token},{token},{token}...]
}


// export const testSingleSubmission = async () => {
//     try {
//         const testSubmission = {
//             source_code: "console.log('Hello World');",
//             language_id: 63, // JavaScript
//             stdin: "",
//             script_name: "script.js" // Add script name for JavaScript
//         };

//         console.log('Testing single submission:', testSubmission);

//         const { data } = await axios.post(
//             `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false`,
//             testSubmission
//         );

//         console.log('Single submission result:', data);
        
//         // Poll for result
//         const token = data.token;
//         let result;
        
//         do {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             const { data: resultData } = await axios.get(
//                 `${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`
//             );
//             result = resultData;
//             console.log('Polling result:', result);
//         } while (result.status.id === 1 || result.status.id === 2);

//         return result;
//     } catch (error) {
//         console.error('Test submission error:', error.response?.data || error.message);
//         throw error;
//     }
// };