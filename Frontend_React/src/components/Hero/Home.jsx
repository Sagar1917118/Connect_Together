import Hero from "./Hero";
import Services from "./Services";
import Banner from "./Banner";
import Footer from "./Fotter";
function Home(){
    return(
        <div className="w-full overflow-x-hidden text-dark">
            <Hero/>
            <Services></Services>
            <Banner/>
            <Footer/>
        </div>
    )
}
export default Home; 