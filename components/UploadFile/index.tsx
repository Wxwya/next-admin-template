'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState,InputHTMLAttributes } from 'react'
import { uploadFile } from '@/lib/request'
import toast  from 'react-hot-toast';
import ViewImage from '@/components/VIewImage';
type UploadFileProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: (filelist: string[]) => void
  filelist?: string[]
  maxCount?: number
}
const UploadFile = (config:UploadFileProps) => {
  const uploadRef = useRef<HTMLInputElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { onChange, filelist=[],maxCount=1, ...restConfig } = config
  const [imgIndex,setImgIndex] = useState(0)
  const onUpload = () => {
    uploadRef.current!.click()
  }
  const handleFileChange = async () => {
    const files:FileList | null = uploadRef.current!.files;
    if (files && files.length + filelist.length  > maxCount) { 
      toast.error(`最多只能上傳${maxCount}張圖片`) 
      return
    }  
    let urls = []
    if(!files) return
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await uploadFile("/api/file/upload", file)
      if (res.code === 200) { 
        urls.push(res.data)
      }
    }
    onChange([...filelist, ...urls])
    const dataTransfer = new DataTransfer()
    uploadRef.current!.files = dataTransfer.files; 
  }
  const onDeleteImage = (index:number) => {
    onChange(filelist.filter((item, i) => i !== index))
  }
  const onViewImages = (index: number) => {
    setImgIndex(index)
    setIsOpen(true)
  }
  return (
    <div>
      <div className=' flex gap-2 flex-wrap justify-center'>
        {filelist.map((item, index) => (
          <div className='w-24 group  aspect-square relative' key={item}>
            <Image src={item} className=' aspect-square' width={96} height={96} alt='圖片暫時加載失敗..' />
            <div onClick={()=>onViewImages(index)} className=' absolute inset-0 bg-[rgb(0,0,0,0.3)] hidden group-hover:flex items-center justify-center'>
              <div className=' flex gap-2 items-center text-sm cursor-pointer'><span className='iconify solar--eye-bold'></span> 預覽</div>
            </div>
            <div onClick={()=>onDeleteImage(index)} className=' w-4 aspect-square bg-black absolute -right-1 -top-1 rounded-full flex items-center justify-center'>
              <div className='iconify line-md--remove text-white text-xs'></div>
            </div>
        </div>
        ))}
        { filelist.length<maxCount &&<div
          onClick={onUpload}
          className=" w-24  aspect-square bg-zinc-100 dark:bg-[--border] border border-dashed flex flex-col justify-center items-center text-zinc-300 "
        >
          <div className="iconify solar--add-square-linear text-3xl"></div>
          <div className=" text-xs mt-2">請上傳文件</div>
        </div>    }
        
      </div>
      <input onChange={handleFileChange}  className="w-0 h-0"   {...restConfig} ref={uploadRef}  type="file"  />
      {isOpen && (
        <ViewImage filelist={filelist} index={imgIndex} onChangeIndex={ setImgIndex} onChangeOpen={setIsOpen} />
      )}
    </div>
  )
}

export default UploadFile
