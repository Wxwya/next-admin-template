import React from 'react'
import Image from 'next/image'
import toast from "react-hot-toast"
type ViewImageProps = {
  filelist: string[]
  index: number
  onChangeOpen: (open: boolean) => void
  onChangeIndex: (index: number) => void
}

const ViewImage = ({ filelist, index, onChangeOpen,onChangeIndex }: ViewImageProps) => {
  const onNext = () => {
    if (index == filelist.length - 1) {
      toast.error('已經是最後一張了...')
    } else {
      onChangeIndex(index + 1)
    }
  }
  const onPrev = () => {
    if (index == 0) {
     toast.error('已經是第一張了...')
    } else {
      onChangeIndex(index - 1)
    }
  }
  return (
    <div className=' fixed flex z-50  inset-0 justify-center items-center bg-[rgba(0,0,0,0.4)]'>
      <div className=''>
         <Image src={filelist[index]} width={200} height={10} className=' w-auto h-auto' alt='圖片暫時無法加載'></Image>
      </div>
      <div onClick={onPrev} className='hover:scale-105 text-2xl flex justify-center items-center  w-14 aspect-square absolute left-8 top-1/2 bg-[rgba(236,236,236,0.3)] rounded-full text-white'>
       <span className='iconify solar--alt-arrow-left-line-duotone'></span>
      </div>
      <div onClick={onNext} className='text-2xl hover:scale-105 flex items-center justify-center text-white w-14 aspect-square absolute right-8 top-1/2 -translate-y-1/2 bg-[rgba(236,236,236,0.3)] rounded-full'>
       <span className='iconify solar--alt-arrow-right-outline'></span>
      </div>
      <div onClick={() => onChangeOpen(false)} className='hover:scale-105 text-2xl flex justify-center items-center  w-14 aspect-square absolute right-4 top-4 bg-[rgba(236,236,236,0.3)] rounded-full text-white'>
        <span className='iconify line-md--close'></span>
      </div>
    </div>
  )
}

export default ViewImage