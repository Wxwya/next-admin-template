import React from 'react'
import Layout from '@/components/Layout'
const OrderInfo = () => {
  return (
    <Layout link='订单管理' href='/order' page='订单信息' pathKey='/order/info' groupKey='/order'>
      <div>OrderInfo</div>
    </Layout>
  )
}

export default OrderInfo