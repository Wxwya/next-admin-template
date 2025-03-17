import { useState } from "react";

/***
 * 
 * @param pageSize  条数
 * 
 * @returns {page: {pageSize, pageNum}, total: number,loading: boolean,data:[]any}
 */
export type PageType = {
    pageSize: number,
    pageNo: number
}
const usePage = (pageSize: number=10) => { 

  const [page,setPage] = useState<PageType>({
    pageSize,
    pageNo: 1,
  })
  const [data,setData]= useState<any[]>([])
  const [total,setTotal]= useState<number>(0)
  const [loading,setLoading] = useState<boolean>(false)
  return {
    page,
    total,
    loading,
    data,
    setPage,
    setData,
    setTotal,
    setLoading
  }
}
export default usePage