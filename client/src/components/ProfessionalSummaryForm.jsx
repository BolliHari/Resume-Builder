import { Sparkles } from 'lucide-react'
import React from 'react'

const ProfessionalSummaryForm = ({data, onChange,setResumeData}) => {
  return (
    <div className='space-y-6'>
        <div className="flex items-center justify-between">
            <div className="">
                <h4 className='font-medium text-lg'>Professional Summary</h4>
                <p className='text-sm text-slate-500'>Add Summary for your Resume</p>
            </div>
            <button className='px-3 py-2 text-sm text-purple-600 flex items-center gap-1 bg-purple-200 border outline-0 rounded-lg hover:border-purple-300 transition-all' >
                <Sparkles className='size-4' />
                AI Enhance
            </button>
        </div>
        <div className="">
            <textarea rows={7} className='w-full p-3 px-4 text-sm text-slate-800' value={data || ""} onChange={(e) => onChange(e.target.value)} placeholder='Write a compelling professional summary' />
            <p className='text-xs text-slate-600 max-w-4/5 mx-auto text-center'>Tip: Write a concise summary highlighting your key skills and experiences.</p>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm
