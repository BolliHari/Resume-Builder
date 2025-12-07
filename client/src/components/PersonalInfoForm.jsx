import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data,  removeBackground, setRemoveBackground, onChange}) => {

    const handler = (field, value) => {
        onChange({
            ...data,
            [field]: value
        })
    }

    const feilds = [
        {key:"full_name", label:"Full Name", icon: User, type: "text", required: true},
        {key:"email", label:"Email", icon: Mail, type: "email", required: true},
        {key:"phone", label:"Phone Number", icon: Phone, type: "tel"},
        {key:"location", label:"Location", icon: MapPin, type: "text"},
        {key:"profession", label:"Profession", icon: BriefcaseBusiness, type: "text"},
        {key:"linkedin", label:"LinkedIn Profile", icon: Linkedin, type: "url"},
        {key:"website", label:"Personal Website", icon: Globe, type: "url"},
    ]

  return (
    <div>
        <h3 className='text-lg font-semibold text-slate-700'>Personal Info</h3>
        <p className='text-sm text-slate-600'>Get Started with the personal information</p>
        <div className="flex items-center gap-4">
            <label>
                {
                    data.image ? (
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="User Image" className='w-16 h-16 rounded-full object-cover mt-5 opacity-80'/>
                    ):(
                        <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
                            <User className='size-10 p-2.5 rounded-full border' />
                            upload user image
                        </div>
                    )
                }
                <input type="file" accept='image/png, image/jpeg' hidden
                onClick={(e) => handler("image",e.target.files[0])}/>
            </label>
            {
                typeof data.image == "object" && (
                    <div className="flex flex-col gap-2 pl-4 text-sm">
                        <p>Background Remove</p>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input type="checkbox" className="sr-only peer" 
                            checked={removeBackground}
                            onChange={() => setRemoveBackground(prev => !prev)}/>
                            <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-200"></div>
                            <span className='absolute left-1 top-1 w-3 h-3 rounded-full bg-white peer-checked:translate-x-4 transition-transform duration-200 ease-in-out'></span>
                        </label>
                    </div>
                )
            }
        </div>
        {
            feilds.map((feild) => {
                const Icon = feild.icon
                return(
                    <div className="space-y-1 mt-5" key={feild.key}>
                        <label className='flex items-center gap-2 text-sm font-medium text-slate-600 mb-2'>
                            <Icon className='size-4'/>
                            {feild.label}
                            {feild.required && (<span className='text-red-500'>*</span>
                            )}
                        </label>
                        <input type={feild.type} value={data[feild.key] || ""} 
                        onChange={(e) => handler(feild.key, e.target.value)}
                        required={feild.required}
                        className='w-full px-4 py-2 border-2 border-gray-200 rounded-md outline-0 focus:border-green-600 ring-green-500'/>
                    </div>
                )
            } )
        }
    </div>
  )
}

export default PersonalInfoForm
