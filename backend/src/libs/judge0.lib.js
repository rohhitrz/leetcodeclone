import axios from "axios"
export const getJudge0LanguageId=(language)=>{
    const languageMap={
        "JAVA": 62,
        "JAVASCRIPT":63,
        "PYTHON":71
    }
    return languageMap[language.toUpperCase()];
}
const sleep=(ms)=> new Promise((resolve)=>setTimeout(resolve,ms));

export const pollBatchResults=async (token)=>{
    while(true){
    const {data}=await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
        params:{
            tokens: token.join(","),
            base64_encoded:false,
        }
    })
    const results=data.submissions

    const isAllDone=results.every((res)=>res.status_id !== 1 && res.status_id !== 2)
    if(isAllDone){
        return results;
    }
    await sleep(1000);
}
}

export const submitBatch=async(submissions)=>{
    const {data}=await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false}`,{
        submissions
    })

    console.log("submission results", data);

    return data; // it will have tokens  [{token},{token},{token}...
}