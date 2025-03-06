import React, { useEffect, useMemo, useState } from 'react'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import CountUp from 'react-countup';

const Card = (props) => {
  const [Liked,setLiked]=useState(true);
  const [likeCount,setLikeCount]=useState();
      const {Heading,text,Number,LikeCount}=props.data;
      const index=props.index;
      
      console.log(Heading,text,LikeCount);


const likeHandle=async()=>{
  console.log("hello sir");
  if(Liked)
  {
    setLikeCount(likeCount+1);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/ilikes/${Number}`);

  }
  else 
  {setLikeCount(likeCount-1);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/dlikes/${Number}`);
  }
  setLiked(!Liked);
}
useEffect(()=>{
  setLikeCount(LikeCount)
},[])



// useMemo(()=>{
//   setLikeCount(LikeCount);
// },[])
      // const animationStyle=[
      //   {data1:"flip-up",data2:"200", data3:"ease-in-back", data4:"600"},
      //   {data1:"flip-left",data2:"200", data3:"ease-in-out-quad", data4:"300"},
      //   {data1:"slide-up",data2:"200", data3:"ease-in-sine", data4:"200"},
      //   {data1:"slide-right",data2:"200", data3:"ease-in-sine", data4:"100"},
      //   {data1:"slide-left",data2:"200", data3:"ease-out-quart", data4:"500"},
      //   {data1:"zoom-in-up",data2:"200", data3:"ease-in-sine", data4:"600"},
      //   {data1:"slide-up",data2:"200", data3:"ease-in-sine", data4:"440"},
      //   {data1:"fade-up-left",data2:"200", data3:"ease-in-cubic", data4:"300"},
      //   {data1:"flip-up",data2:"200", data3:"ease-in-sine", data4:"200"},
      //   {data1:"fade-down-left",data2:"200", data3:"ease-in-sine", data4:"100"}
      // ]
  return (
<div className='Card'>
<div className='Heading'>{Heading}</div>
<div className='Content'>{text}</div>
<div className='cardFooter'>
  <div>
  {Liked && <CiHeart onClick={likeHandle}></CiHeart>
  }
  {!Liked && <FaHeart onClick={likeHandle} className='Liked' ></FaHeart>
  }
    </div>
  <div>
  {
    <CountUp start={0} end={likeCount} delay={0}>
  </CountUp>
  }
    </div>

  
</div>

</div>
  )
}

export default Card



// {/* <div className='Card' data-aos={animationStyle[index%6].data1} data-aos-offset={animationStyle[index%6].data2} data-aos-easing={animationStyle[index].data3} data-aos-duration={animationStyle[index].data4}>
//   {/* <div className='imagecontainer' style={{width:index%2==0?"45%" : "55%"}} data-aos="fade-up-right"  ><img src={image} alt="Description of the image"/></div> */}
//   <div className='Heading'></div>
//   <div className='Content' style={{width:index%2==0?"55%" : "45%"}}  >{text}</div>
// </div> */}