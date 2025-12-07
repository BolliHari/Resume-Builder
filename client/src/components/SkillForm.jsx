import { Plus, Sparkle, Sparkles, X } from 'lucide-react';
import React from 'react'

const SkillForm = ({data, onChange}) => {
    const [newSkill, setNewSkill] = React.useState("");

    const addSkill = () =>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()]);
            setNewSkill("");
        }
    }

    const removeSkill = (indexofremove) =>{
        const updatedSkills = data.filter((_, index) => index !== indexofremove);
        onChange(updatedSkills);
    }

    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            e.preventDefault();
            addSkill();
        }
    }

  return (
    <div className='space-y-4'>
      <div className="">
        <h3 className="text-lg font-medium">Skills</h3>
        <p className="text-sm text-gray-600">Add your skills below</p>
      </div>
      <div className="flex gap-2">
        <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={handleKeyDown} placeholder='Enter a skill' className='flex-grow px-3 py-2 border border-gray-400 text-sm focus:border-blue-500 rounded-lg'/>
        <button onClick={addSkill} className='flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm'>
            <Plus  size={16}/>
            Add</button>
      </div>
      {data.length > 0 ? 
      (
        <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
                <span className='flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full text-blue-500 text-sm' key={index}>
                    {skill}
                    <button className='hover:bg-blue-200 p-0.5 rounded-full transition-all'>
                        <X size={12} onClick={() => removeSkill(index)} />
                    </button>
                </span>
            ))}
        </div>
      ):(
        <div className="text-center py-8 text-gray-500">
            <Sparkles className='w-12 h-12 mb-5 mx-auto text-gray-300' />
            <p className='text-sm'>No skills added yet.</p>
            <p className='text-sm'>Use the input above to add your skills.</p>
        </div>
      )}
      <div className="bg-blue-100 p-3 rounded-lg">
        <p className='text-sm text-blue-400'><strong>Tips:</strong>Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).</p>
      </div>
    </div>
  )
}

export default SkillForm
