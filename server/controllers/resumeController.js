import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs"



export const createResume = async (req,res) => {
    try {
        const userId = req.userId;
        const {title} = req.body;

        const newResume = await Resume.create({userId,title})
        return res.status(201).json({message: "Resume Created succussfully",resume: newResume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const deleteResume = async (req,res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        await Resume.findOneAndDelete({userId, _id:resumeId})
        return res.status(201).json({message: "Resume Deleted succussfully"})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const getResumeById = async (req,res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        const resume = await Resume.findOne({userId, _id:resumeId})
        if (!resume) {
            return res.status(404).json({message:"Resume Not Found"})   
        }
        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined


        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}



export const getPublicResumeById = async (req,res) => {
    try {
        const {resumeId} = req.params;
        const resume  = await Resume.findOne({public:true, _id:resumeId})
        
        if (!resume) {
            return res.status(404).json({message: "Resume Not Found"})
        }
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message:error.message})        
    }
}


export const updateResume = async (req,res) => {
    try {
        const userId = req.userId
        const {resumeId, resumeData, removeBackground} = req.body;
        const image = req.file;

        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = JSON.parse(resumeData)
        }else{
            resumeDataCopy = structuredClone(resumeData)
        }
        
        if(image){
            const imageBuffer = fs.createReadStream(image.path)
            const response = await imagekit.files.upload({
                file: imageBuffer,
                fileName: 'resume.png',
                folderName: "user-resumes",
                transformation:{
                    pre:"w-300,h-300,fo-face,z-0.75" + (removeBackground ? "e-bgremove" : "")
                }
            });
            resumeDataCopy.personal_info.image = response.url
        }
        
        const resume = await Resume.findByIdAndUpdate({userId,_id:resumeId},resumeDataCopy,{new:true});

        return res.status(200).json({message: "Save succussfully",resume})
    } catch (error) {
        return res.status(400).json({message:error.message})        
    }
}

