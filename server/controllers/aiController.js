import ai from "../configs/ai.js";
import { resumeSchema } from "../configs/genai.js";
import openai from "../configs/openai.js";
import Resume from "../models/Resume.js";




export const enhanceProfessionalSummary = async (req,res) => {
    try {
        
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({message: "Missing Required Fields"})
        }
        const resumeToEnhance = userContent;
        const systemPrompt = "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1–2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.";
        const response = await ai.models.generateContent({
            model: process.env.OPENAI_MODEL, 
            config: {
                systemInstruction: systemPrompt,
            },
            contents: [
                { 
                    role: "user", 
                    parts: [{ text: resumeToEnhance }] 
                }
            ]
        });

        
        const enhanceResponces = response.text;
        return res.status(200).json({enhanceResponces})

    } catch (error) {
        return res.status(400).json({message: error.message}) 
    }
}




export const enhanceJobDescripition = async (req,res) => {
    try {
        
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({message: "Missing Required Fields"})
        }

        const resumeToEnhance = userContent;
        const systemPrompt = "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1–2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else.";

        const response = await ai.models.generateContent({
            model: process.env.OPENAI_MODEL, 
            config: {
                systemInstruction: systemPrompt,
            },
            contents: [
                { 
                    role: "user", 
                    parts: [{ text: resumeToEnhance }] 
                }
            ]
        });
        const enhanceResponces = response.text;
        return res.status(200).json({enhanceResponces})

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message: error.message}) 
    }
}



export const uploadResume = async (req,res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId
        
        if (!resumeText) {
            return res.status(400).json({message: "Missing Required Fields"})
        }
        const systemPrompt = "You are an expert AI Agent to extract data from resume.";

        const userPrompt = `
            Extract structured resume data from the following text:

            ${resumeText}

            Return ONLY valid JSON in this exact structure:

            {
            "professional_summary": "",
            "skills": [],
            "personal_info": {
                "full_name": "",
                "email": "",
                "phone": "",
                "location": "",
                "linkedin": "",
                "website": "",
                "profession": "",
                "image": ""
            },
            "experience": [
                {
                "company": "",
                "position": "",
                "start_date": "",
                "end_date": "",
                "description": "",
                "is_current": false
                }
            ],
            "education": [
                {
                "institution": "",
                "degree": "",
                "field": "",
                "graduation_date": "",
                "gpa": ""
                }
            ],
            "project": [
                {
                "name": "",
                "type": "",
                "description": ""
                }
            ]
            }
            `;

        
        
        // const response = await ai.chat.completions.create({
        //     model: process.env.OPENAI_MODEL,
        //     messages: [
        //         { role: "system", content: systemPrompt },
        //         { role: "user", content: userPrompt }
        //     ],
        //     response_format: { type: 'json_object' }
        // });

        // const parsedData = JSON.parse(response.choices[0].message.content);
        
        const response = await ai.models.generateContent({
            model: process.env.OPENAI_MODEL, // e.g., "gemini-2.5-flash"
            contents: [
                { role: "user", parts: [{ text: userPrompt }] }
            ],
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: resumeSchema
            }
        });

        // The response structure also changes:
        const aiResponseContent = response.text; // The response text is the JSON string
        const parsedData = JSON.parse(aiResponseContent);

        const newResume = await Resume.create({ userId, title, ...parsedData });

        res.json({ resumeId: newResume._id });
    } catch (error) {
        return res.status(400).json({message: error.message}) 
    }
}