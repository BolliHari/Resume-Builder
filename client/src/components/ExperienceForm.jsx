import { Briefcase, LoaderCircleIcon, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../configs/api';

const ExperienceForm = ({data, onChange}) => {

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience]);
    }

    const removeExperience = (index) => {
        const updatedExperience = data.filter((_, i) => i !== index);
        onChange(updatedExperience);
    }

    const updateExperience = (index, field, value) => {
        const updatedExperience = [...data];
        updatedExperience[index] = {
            ...updatedExperience[index],
            [field]: value
        };
        onChange(updatedExperience);
    }


    const { token } = useSelector(state => state.auth)
    const [isGenetaring, setIsGenerating] = useState(-1)

    const generate_pro = async (index) => {
        try {
            setIsGenerating(index)
            const exp = data[index]
            const prompt = `enhance my Job description "${exp.description}"`;
            const response = await api.post('/api/ai/enchance-job-desc',{userContent : prompt}, {headers:{
                Authorization : token
            }})
            updateExperience(index, "description", response.data.enhanceResponces)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsGenerating(-1)
        }
    }


  return (
    <div className='space-y-6'>
        <div className="flex items-center justify-between">
            <div className="">
                <h4 className='font-medium text-lg'>Professional Experience</h4>
                <p className='text-sm text-slate-500'>Add your work experiences</p>
            </div>
            <button onClick={() => addExperience()} className='px-3 py-1 text-sm text-green-600 flex items-center gap-1 bg-green-100 border outline-0 rounded-lg hover:bg-green-200 transition-all' >
                <Plus className='size-4' />
                Add Experience
            </button>
        </div>
        {data.length == 0 ? (
            <div className="text-center py-8 text-gray-500">
                <Briefcase className="w-12 h-12 mb-5 mx-auto text-gray-300" />
                <p className='text-sm'>No professional experience added yet.</p>
                <p className='text-sm'>Click the "Add Experience" button to get started.</p>
            </div>
        ):
        (
            <div className="space-y-4">
                {data.map((experience, index) => (
                    <div className="p-3 border border-gray-200 rounded-lg space-y-4" key={index}>
                        <div className="flex justify-between items-start">
                            <h3>Experience {index + 1}</h3>
                            <button className='text-red-400 hover:text-red-600' onClick={() => removeExperience(index)}>
                                <Trash2 className='size-4' />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" value={experience.company || ""} onChange={(e) => updateExperience(index, "company", e.target.value)} placeholder='Company Name' className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500'/>

                            <input type="text" value={experience.position || ""} onChange={(e) => updateExperience(index, "position", e.target.value)} placeholder='Job Title' className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500'/>

                            <input type="month" value={experience.start_date || ""} onChange={(e) => updateExperience(index, "start_date", e.target.value)} className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500 cursor-pointer'/>
                            
                            <input type="month" value={experience.end_date || ""} onChange={(e) => updateExperience(index, "end_date", e.target.value)} className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500 disabled:bg-gray-100 cursor-pointer' disabled={experience.is_current} />
                        </div>
                        <label className='flex items-center text-sm'>
                            <input type="checkbox" checked={experience.is_current} onChange={(e) => updateExperience(index, "is_current", e.target.checked ? true : false)} className='mr-2' />
                            <span className='text-sm text-gray-600'>Currently Working Here</span>
                        </label>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className='text-sm font-medium text-gray-700'>Job Description</h4>
                                <button onClick={() => generate_pro(index)} className='flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-lg hover:bg-purple-200 transition-all'>
                                    {
                                        isGenetaring === index ? (
                                            <LoaderCircleIcon className='size-4 animate-spin'/>
                                        ) : (
                                            <Briefcase className='size-4' />
                                        )
                                    }
                                    {
                                        isGenetaring === index? "Enchaning..." : "AI Enhance"
                                    }
                                </button>
                            </div>
                            <textarea rows={4} value={experience.description || ""} onChange={(e) => updateExperience(index, "description", e.target.value)} placeholder='Describe your role and responsibilities' className='w-full p-2 border border-gray-400 text-sm focus:border-blue-500'></textarea>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ExperienceForm
