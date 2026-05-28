import axios from "axios";

const JUDGE0_URL = process.env.JUDGE0_URL;

export const submitCodeToJudge0 = async(
    sourceCode:string,
    languageId:number
)=>{
     const response = await axios.post(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
        {
        source_code: sourceCode,
        language_id: languageId
     });
     return response.data.token;
}

export  const getSubmissionResult = async(token:String)=>{
    while(true){
        const response = await axios.get(
            `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`
        );
         const result = response.data;

         if(result.status.id > 3){
            return result;
         }

         await new Promise((resolve)=>setTimeout(resolve, 1000));
    }
}

export const runCoode =  async(
    sourceCode:string,
    languageId:number   
)=>{
    try{
        const token = await submitCodeToJudge0(sourceCode, languageId);
        const result = await getSubmissionResult(token);
        return result;
    } catch (error) {
        console.error("Error running code:", error);
        throw error;
    }
}