import React, { useEffect, useState } from 'react'
import Card from './Card'
import Header from './BlogHeader'
import VideoCard from './VideoCard'
const BlogPage = () => {
const [Blogs,setBlog]=useState([])
const [showBlog,setShowBlog]=useState(true);



  useEffect(()=>{
    FetchHandle();
  },[])
  const [youtubeLinks, setYoutubeLinks] = useState([
    "https://www.youtube.com/embed/oDKV3s3k6b4?si=2qjuzYYvuHWPbaND", 
    "https://www.youtube.com/embed/N3WJwOhnqzM?si=IBMhm9ly1bl7OybV", 
    "https://www.youtube.com/embed/kJGpKKvlqPs?si=NgvrwU4_TIacmZhN", 
    "https://www.youtube.com/embed/BEC_rHlvTdA?si=H0sjS9FXXCb_mtoy", 
    "https://www.youtube.com/embed/1X2b-mmj2tk?si=kM421mL1Mo4JntMB",  
  ]);
  const [datafetched, setDataFetched] = useState(false);
const FetchHandle=async()=>{
  const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/blog`);
  const data=await response.json();
  console.log("data obtainder",data);
  setBlog(data);
}
const blogHandle=()=>{
  setShowBlog(true);
}
const videoHandle=()=>{
  setShowBlog(false);
}


  const animationattribute=[
    {m1:"fade-up-right"},
  ]
  return (
    <div className='BlogPage'>
      <div className='blogvideodecider'>
        <button onClick={blogHandle}>Blog</button>
        <button onClick={videoHandle}>Video</button>
      </div>
<div className='content'>
{ !showBlog &&
      <div className='videosection'>
        {/* <div className='videoheading'>Video: </div> */}
      <div className='videos-container'>
            {
              youtubeLinks.map((data)=>{
                return <VideoCard  data={data} />;
              })
            }
            
        </div>
      </div>}



{ showBlog && 
     <div className='textsection'>
      { 
        Blogs.map((data,index)=>{
          return <Card data={data} count={index} key={index} index={index}></Card>
        })
      }
=
      </div>}
</div>




    </div>
  )
}

export default BlogPage;