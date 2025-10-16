import React from 'react'
import './BlogSec.css'

import BlogGrid from '../../Components/BlogGrid/BlogGrid'
import BlogBanner from '../../Components/BlogBanner/BlogBanner'
import VisaApplicationForm from '../../Components/VisaApplicationForm/VisaApplicationForm'
import TravelUtility from '../../Components/TravelUtility/TravelUtility'

const BlogSec = () => {
  return (
    <div>
      <BlogBanner/>
      <BlogGrid/>

      <VisaApplicationForm/>
      <TravelUtility/>
W    </div>
  )
}

export default BlogSec