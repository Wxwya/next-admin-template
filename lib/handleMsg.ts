import toast  from 'react-hot-toast';
const handleMsg = (pageData: any, show: boolean) => { 
  if (pageData.code === 200) {
    show && toast.success(pageData.msg || 'ok')
  } else if (pageData.code === 401 || pageData.code === 1002 || pageData.code === 1003 || pageData.code === 1004) {
    toast.error(pageData.msg || '请求错误')
    // 退到登录页面
    localStorage.removeItem("token")
    location.reload()
  } else if (pageData.code === 500) {
    toast.error("请稍后重试....")
  } else { 
    toast.error(pageData.msg || '请求错误')
  }
  
}

export default handleMsg