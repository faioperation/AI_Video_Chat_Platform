import Banner from '@/src/component/Banner'
import FAQsection from '@/src/component/FAQsection'
import Features from '@/src/component/Features'
import Footer from '@/src/component/Footer'
import VideoChat from '@/src/component/VideoChat'

import React from 'react'

const page = () => {
  return (
    <div className=''>
      <Banner/>
      <Features />
      <VideoChat/>
      <FAQsection/>
      <Footer/>
    </div>
  )
}

export default page
