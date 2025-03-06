import React from 'react'

const VideoCard = (props) => {
      console.log(props.data)
  return (
      <div className='video-item'>
      <iframe
        width='580'
        height='340'
        src={props.data}
        frameBorder='0'
        allowFullScreen
      ></iframe>
      
    </div>
  )
}

export default VideoCard