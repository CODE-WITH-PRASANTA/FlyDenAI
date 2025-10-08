import React from 'react'
import './BlogSec.css'

import BlogGrid from '../../Components/BlogGrid/BlogGrid'
import MindBlowing from '../../Components/MindBlowing/MindBlowing'
import BlogBanner from '../../Components/BlogBanner/BlogBanner'
import BlogDetailsBanner from '../../Components/BlogDetailsBanner/BlogDetailsBanner'

const BlogSec = () => {
  return (
    <div>

      <BlogBanner/>
      <BlogGrid/>
      <BlogDetailsBanner/>
      <MindBlowing/>
      
        
    </div>
  )
}

export default BlogSec