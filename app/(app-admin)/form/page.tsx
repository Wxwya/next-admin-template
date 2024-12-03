import React from 'react'
import Layout from '@/components/Layout'
import { XwyaForm } from '@/components/XwyaForm'
const FormPage = () => {
  return (
    <Layout page='表单' pathKey='/form'>
      <div className=' p-4'>
      <XwyaForm />
      </div>
    </Layout>
  )
}

export default FormPage