import { Slide } from "react-awesome-reveal";
function Secction3Card({img,text1,text2,idx}){
    return(
        
        <div className="w-full flex flex-col gap-6 lg:flex-row justify-around items-center p-6 ">
            <div className="w-full lg:w-1/2">
                <div className="flex items-start gap-10">
                    <div className="p-8 aspect-square overflow-y-hidden rounded-full flex justify-center items-center   bg-[#1356c5] text-white font-bold text-4xl">{idx}</div>
                     <div>
                     <p className="text-[30px] font-bold font-inter text-[#1356c5]">{text1}</p>
                     <div className=" overflow-hidden text-[20px] p-2  leading-8 mt-5">{text2}</div>
                     </div>
                </div>    
            </div>
            <Slide direction="right">
                <div className="rounded-2xl">
                    <img src={img} className="w-[400px] rounded-2xl shadow-lg  shadow-gray-500/90"></img>
                </div>
            </Slide>
        </div>
       
    )
};
export default Secction3Card;