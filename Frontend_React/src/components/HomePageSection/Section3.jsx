import Secction3Card from "./Section3Card";
import img2 from "../../assets/section3img2.jpeg";
import img3 from "../../assets/section3img3.jpg";
import img1 from "../../assets/section3img1.jpg";
function Section3(){
    return(
          
            <div className="mx-auto  max-w-maxContent mt-10 customBoxShadow">
                <h1 className="text-[30px] font-bold font-inter">How does Menty work?</h1>
                <div className="flex flex-col gap-10">
                <Secction3Card idx={"1"} text1={"Stuck while studying?"} text2={"Everyday unanswered questions become huge backlogs overtime."} img={img1} />
                <Secction3Card idx={"2"} text1={"Take a photo of your question"} text2={"Feel free to ask about any questions, concepts, or formulas that interest you"} img={img2} />
                <Secction3Card idx={"3"} text1={"Connect to a tutor"} text2={"Rest assured, our amiable expert will consistently be available to assist you in achieving a deeper understanding"} img={img3} />
                </div>
            </div>
        
    )
};
export default Section3;