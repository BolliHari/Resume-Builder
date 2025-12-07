import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data,onChange}) => {
    const addProject = () => {
        const newProject = {
            name: "",
            type : "",
            description: "",
        };
        onChange([...data, newProject]);
    }

    const removeProject = (index) => {
        const updatedProjects = data.filter((_, i) => i !== index);
        onChange(updatedProjects);
    }
    const updateProject = (index, field, value) => {
        const updatedProjects = [...data];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: value
        };
        onChange(updatedProjects);
    }
  return (
    <div>
        <div className="flex items-center justify-between">
            <div className="">
                <h4 className='font-medium text-lg'>Projects</h4>
                <p className='text-sm text-slate-500'>Add your project details</p>
            </div>
            <button onClick={() => addProject()} className='px-3 py-1 text-sm text-green-600 flex items-center gap-1 bg-green-100 border outline-0 rounded-lg hover:bg-green-200 transition-all' >
                <Plus className='size-4' />
                Add Project
            </button>
        </div>
        
        <div className="space-y-4 mt-6">
            {data.map((project, index) => (
                <div className="p-3 border border-gray-200 rounded-lg space-y-4" key={index}>
                    <div className="flex justify-between items-start">
                        <h3>Project {index + 1}</h3>
                        <button className='text-red-400 hover:text-red-600' onClick={() => removeProject(index)}>
                            <Trash2 className='size-4' />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" value={project.name || ""} onChange={(e) => updateProject(index, "name", e.target.value)} placeholder='Project Name' className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500'/>

                        <input type="text" value={project.type || ""} onChange={(e) => updateProject(index, "type", e.target.value)} placeholder='Type' className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500'/>

                        
                    </div>
                    <textarea rows={4} value={project.description || ""} onChange={(e) => updateProject(index, "description", e.target.value)} placeholder='Description' className='px-2 py-2 border border-gray-400 text-sm focus:border-blue-500 w-full resize-none'/>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default ProjectForm
