import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data,onChange}) => {
    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };
        onChange([...data, newEducation]);
    }

    const removeEducation = (index) => {
        const updatedEducation = data.filter((_, i) => i !== index);
        onChange(updatedEducation);
    }
    const updateEducation = (index, field, value) => {
        const updatedEducation = [...data];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value
        };
        onChange(updatedEducation);
    }

  return (
    <div className='space-y-6'>
        <div className="flex items-center justify-between">
            <div className="">
                <h4 className='font-medium text-lg'>Education</h4>
                <p className='text-sm text-slate-500'>Add your educational qualifications</p>
            </div>
            <button onClick={() => addEducation()} className='px-3 py-1 text-sm text-green-600 flex items-center gap-1 bg-green-100 border outline-0 rounded-lg hover:bg-green-200 transition-all' >
                <Plus className='size-4' />
                Add Education
            </button>
        </div>
        {data.length == 0 ? (
            <div className="text-center py-8 text-gray-500">
                <GraduationCap className="w-12 h-12 mb-5 mx-auto text-gray-300" />
                <p className='text-sm'>No education added yet.</p>
                <p className='text-sm'>Click the "Add Education" button to get started.</p>
            </div>
        ):(
            <div className="space-y-4">
                {data.map((education, index) => (
                    <div className="p-3 border border-gray-200 rounded-lg space-y-4" key={index}>
                        <div className="flex justify-between items-start">
                            <h3>Education {index + 1}</h3>
                            <button className='text-red-400 hover:text-red-600' onClick={() => removeEducation(index)}>
                                <Trash2 className='size-4' />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" value={education.institution || ""} onChange={(e) => updateEducation(index, "institution", e.target.value)} placeholder='Institution Name' className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500'/>

                            <input type="text" value={education.degree || ""} onChange={(e) => updateEducation(index, "degree", e.target.value)} placeholder='Degree' className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500'/>

                            <input type="text" value={education.field || ""} onChange={(e) => updateEducation(index, "field", e.target.value)} className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500 cursor-pointer' placeholder='Field'/>
                            
                            <input type="month" value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500 disabled:bg-gray-100 cursor-pointer'/>
                        </div>
                        <input type="text" value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500 cursor-pointer' placeholder='GPA'/>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default EducationForm
