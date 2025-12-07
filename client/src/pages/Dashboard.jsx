import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { dummyResumeData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import api from '../configs/api';
import { useSelector } from 'react-redux';
import pdfToText from 'react-pdftotext'
import toast from 'react-hot-toast';


const Dashboard = () => {

  const navigate = useNavigate();
  const {user, token} = useSelector(state => state.auth)

  const [allResumes, setAllResumes] = React.useState([]);
  const [showCreateResume, setShowCreateResume] = React.useState(false);
  const [showUploadResume, setShowUploadResume] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [resume, setResume] = React.useState(null);
  const [editResumeId, setEditResumeId] = React.useState("");
  const colors = ["#9333ea", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  const [isLoading, setIsLoading] = useState(false)

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/user/resumes', { headers: {
        Authorization: token
      } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const createResume = async (e) => {
    e.preventDefault();
    console.log('createResume called with title:', title)
    try {
      const { data } = await api.post('/api/resume/create', { title }, { headers: {
        Authorization: token
      } })
      setAllResumes([...allResumes, data.resume])
      setShowCreateResume(false);
      setTitle('')
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    
  }

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume) 
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: {
        Authorization: token
      } })
      setTitle('')
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle =async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/api/resume/update`, {resumeId: editResumeId,resumeData:{title}}, { headers: {
      Authorization: token}})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume , title}:resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const deleteResume = async (resumeId) => {
    try {
      const conform = window.confirm("Are you sure you want to delete this resume?");
      if (conform) {
        const { data } = await api.delete(`/api/resume/delete/${resumeId}`, { headers: {
        Authorization: token
      } })
        setAllResumes(prev => prev.filter(resume => resume._id !== resumeId));
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  React.useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className='text-2xl font-medium bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>WelCome, Hari</p>

        <div className="flex gap-4">
          <button className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center gap-2 text-slate-600 border border-dashed border-slate-300 group hover:shadow-lg hover:border-indigo-500 cursor-pointer transition-all duration-300 rounded-lg' onClick={() => setShowCreateResume(true)}>
            <PlusIcon className='p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 size-11 rounded-full text-white' />
            <p className='text-sm group-hover:text-indigo-500 transition-all duration-300'>Create</p>
          </button>
          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center gap-2 text-slate-600 border border-dashed border-slate-300 group hover:shadow-lg hover:border-purple-500 cursor-pointer transition-all duration-300 rounded-lg' >
            <UploadCloudIcon className='p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 size-11 rounded-full text-white' />
            <p className='text-sm group-hover:text-purple-500 transition-all duration-300'>Upload Existing</p>
          </button>
        </div>

      <hr className='bg-slate-600 my-6 sm:max-w-[305px]' />
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume,index) => {
          const basecolor = colors[index % colors.length];
          return(
            <button key={index} onClick={() => {navigate(`/app/builder/${resume._id}`)}} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg cursor-pointer transition-all duration-300' style={{ borderColor: basecolor + "40",background : `linear-gradient(135deg, ${basecolor}20, ${basecolor}10)`}}>
                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all duration-300' style={{color:basecolor}}/>
                <p className='text-sm group-hover:scale-105 transition-all duration-300 px-2' style={{color:basecolor}}>{resume.title}</p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 '>Updated on  {new Date(resume.updatedAt).toLocaleDateString()}</p>
                <div onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon onClick={() => deleteResume(resume._id)} className='sixe-7 p-1.5 hover:bg-white/50 rounded transition-colors'/>
                  <PencilIcon onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className='sixe-7 p-1.5 hover:bg-white/50 rounded transition-colors'/>
                </div>
            </button>
          )
        })}
      </div>

      {showCreateResume && (
        <form onSubmit={createResume} className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10 bg-opacity-50' onClick={() => setShowCreateResume(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className='text-lg mb-3'>Create Resume</h2>
            <input type="text" placeholder='Enter Resume Title' onChange={(e) => {setTitle(e.target.value)}} value = {title} className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-500 border-2 border-gray-200 rounded-md outline-0'/>
            <button type='submit' className='w-full bg-green-500 text-white rounded-md py-2 cursor-pointer hover:bg-green-600 transition-colors'>Create</button>
            <XIcon onClick={() => {setShowCreateResume(false);setTitle("")}} className='absolute top-2 right-2 cursor-pointer hover:text-red-500 transition-colors' />
          </div>
        </form>
      )}

      {showUploadResume && (
        <form onSubmit={uploadResume} className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10 bg-opacity-50' onClick={() => setShowUploadResume(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className='text-lg mb-3'>Upload Resume</h2>
            <input type="text" placeholder='Enter Resume Title' onChange={(e) => {setTitle(e.target.value)}} value = {title} className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-500 border-2 border-gray-200 rounded-md outline-0'/>
            <div>
              <label htmlFor="resume-input" className='block text-sm text-slate-700'>
                Select Resume File:
                <div className="flex flex-col items-center justify-center border my-4 p-4 py-10 border-dashed border-slate-400 text-slate-400 rounded-md cursor-pointer gap-2 group hover:border-green-500 hover:text-green-500 transition-colors'>">
                  {
                    resume ? (
                      <p className='text-green-700'>{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Uplaod Resume</p>
                      </>
                    )
                  }
                </div>
              </label>
              <input type="file" id='resume-input' hidden onChange={(e) => {setResume(e.target.files[0])}} accept='.pdf' />
            </div>
            <button className=' flex items-center gap-2 w-full bg-green-500 text-white justify-center rounded-md py-2 cursor-pointer hover:bg-green-600 transition-colors'>
              {isLoading && <LoaderCircleIcon className='size-4 text-white animate-spin' />}
              {isLoading ? "Uploading..." : "Upload Resume"}
              </button>
            <XIcon onClick={() => {setShowUploadResume(false); setTitle("")}} className='absolute top-2 right-2 cursor-pointer hover:text-red-500 transition-colors' />
          </div>
        </form>
      )

      }
      {editResumeId && (
        <form onSubmit={editTitle} className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10 bg-opacity-50' onClick={() => setEditResumeId("")}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className='text-lg mb-3'>Edit Resume</h2>
            <input type="text" placeholder='Enter Resume Title' onChange={(e) => {setTitle(e.target.value)}} value = {title} className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-500 border-2 border-gray-200 rounded-md outline-0'/>
            <button className='w-full bg-green-500 text-white rounded-md py-2 cursor-pointer hover:bg-green-600 transition-colors'>Update</button>
            <XIcon onClick={() => {setEditResumeId("");setTitle("")}} className='absolute top-2 right-2 cursor-pointer hover:text-red-500 transition-colors' />
          </div>
        </form>
      )}
      
      </div>
    </div>
  )
}

export default Dashboard
