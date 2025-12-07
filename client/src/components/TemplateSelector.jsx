import { Check, Layout } from 'lucide-react';
import React from 'react'

const TemplateSelector = ({selectedTemplate,onChange}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const templates =  [
        {
            id: 'classic',
            name: 'Classic',
            preview: "Clean and traditional layout with clear sections."
        },
        {
            id: 'modern',
            name: 'Modern',
            preview: "Sleek design with contemporary elements."
        },
        {
            id: 'minimal',
            name: 'Minimal',
            preview: "Simple and elegant with ample white space."
        },{
            id: 'minimal-image',
            name: 'Minimal with Image',
            preview: "Minimalist design featuring a profile image."
        }
    ]
  return (
    <div className='relative'>
      <button onClick={() => setIsOpen(!isOpen)} className='px-3 py-2 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-200 hover:ring text-sm flex items-center gap-1 rounded-lg font-medium text-blue-700 border border-blue-200 hover:shadow-md transition-all'>
        <Layout size={14} /> <span className=''>Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-xs bg-white border border-gray-200 shadow-lg rounded-lg z-10 p-3 space-y-4">
            {templates.map((template) => (
                <div key={template.id} className={"relative p-3 cursor-pointer space-y-2 transition-all rounded-lg " + (selectedTemplate === template.id ? 'bg-blue-100 border border-blue-200' : 'border border-gray-200 hover:bg-gray-200')} onClick={() => {onChange(template.id); setIsOpen(false)}}>
                    {selectedTemplate === template.id && (
                        <div className="size-5 rounded-full flex items-center justify-center bg-blue-600 absolute top-2 right-2">
                            <Check size={14} className='text-white' />
                        </div>
                    )}
                    <div className="">
                        <h4 className='font-medium text-slate-700'>{template.name}</h4>
                        <div className="mt-2 text-sm text-slate-500 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            {template.preview}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
