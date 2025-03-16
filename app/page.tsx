import Layout from '@/components/Layout'
import UploadFile from '@/components/UploadFile'

const Home = (config) => {
  return (
    <>
      <Layout page="首页" pathKey="/">
        <div className='h-full flex justify-center items-center'>
          <UploadFile />
        </div>
      </Layout>
    </>
  )
}
export default Home
