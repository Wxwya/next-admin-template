import React from 'react'
import Layout from '@/components/Layout'
const User = () => {
  return (
    <Layout link='用户中心' href='/userCenter' page='用户管理' pathKey='/userCenter/user' groupKey='/userCenter'>
      <div>User</div>
      </Layout>
  )
}

export default User