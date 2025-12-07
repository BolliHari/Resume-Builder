import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {

  const { resumeId } = useParams()
  const [isLoading,setIsLoading] = useState(true)
  const [resumeData,setResumeData] = useState()

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resume/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  },[])

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className="max-w-3xl mx-auto px-4">
        <ResumePreview data={resumeData} template={resumeData.templates} accentColor={resumeData.accent_color} classes='bg-white'/>
      </div>
    </div>
  ) : (
    isLoading ? (<Loader />) : (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-center">
          <p className='text-4xl text-slate-500 font-medium'>Resume Not Found</p>
          <a href="/" className='flex items-center gap-4 mt-5 px-6 py-3 bg-green-400 rounded-full text-white hover:bg-green-500 ring-2 ring-green-300 hover:ring-green-400'>
            <ArrowLeftIcon className='size-4'/> Go To Home
          </a>
        </div>
      </div>
    )
  )
}

export default Preview
