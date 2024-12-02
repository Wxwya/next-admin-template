import React from 'react'
import Layout from '@/components/Layout'
const OrderList = () => {
  return (
    <Layout link='订单管理' href='/order' page='订单列表' pathKey='/order/list' groupKey='/order'>
      <div>OrderList</div>
      </Layout>
  )
}

export default OrderList