import { Check, Palette } from 'lucide-react'
import React from 'react'

const ColorPicker = ({selectedColor,onChange}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const colors = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Green', value: '#10B981' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Orange', value: '#F59E0B' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Teal', value: '#14B8A6' },
        { name: 'Indigo', value: '#6366F1' },
    ]
  return (
    <div className='relative'>
      <button onClick={() => {setIsOpen(!isOpen)}} className='flex items-center gap-1 bg-gradient-to-br  from-purple-50 to-purple-100 text-sm text-purple-600 px-3 py-2 ring-purple-300 hover:ring rounded-lg transition-all'>
        <Palette size={16} /> <span className='max-sm:hidden'>Accent</span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-4 gap-2 absolute top-full mt-2 w-60 left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg z-10 p-3">
            {colors.map((color) => (
                <div key={color.value} className="relative flex flex-col cursor-pointer group">
                    {selectedColor === color.value && (
                        <div className="size-5 rounded-full flex items-center justify-center absolute z-10 opacity-100 top-2.5 right-4.5 transition-all">
                            <Check size={16} className='text-white' />
                        </div>
                    )}
                    <div className={"w-10 h-10 rounded-full border-2 " + (selectedColor === color.value ? 'border-gray-800' : 'border-gray-200 hover:border-gray-500')} 
                        style={{backgroundColor: color.value}} 
                        onClick={() => {onChange(color.value); setIsOpen(false)}}
                    ></div>
                    <span className='text-xs text-center mt-1 text-slate-600'>{color.name}</span>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default ColorPicker
