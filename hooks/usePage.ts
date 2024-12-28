import { useState } from "react";

/***
 * 
 * @param pageSize  条数
 * 
 * @returns {page: {pageSize, pageNum}, total: number,loading: boolean,data:[]any}
 */
const usePage = (pageSize: number=10) => { 

  const [page,setPage] = useState({
    pageSize,
    pageNo: 1,
  })
  const [data,setData] = useState([])
  const [total,setTotal]:number = useState(0)
  const [loading,setLoading] = useState(false)
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