import React from 'react'
import './BlogSec.css'

import BlogGrid from '../../Components/BlogGrid/BlogGrid'
import BlogBanner from '../../Components/BlogBanner/BlogBanner'

const BlogSec = () => {
  return (
    <div>
      <BlogBanner/>
      <BlogGrid/>
   </div>
  )
}

export default BlogSec