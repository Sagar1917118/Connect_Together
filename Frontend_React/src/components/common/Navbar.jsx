import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import logo from "../../assets/Connect.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {

  const { token } = useSelector((state) => state.auth)                    //fetch token from auth reducer using useSelector hook;
  const { user } = useSelector((state) => state.profile)
  const [toDispaly,setToDisplay]=useState(user?.role=="Student"?1:0);
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()                                               // location is used for location.pathname;                                                       

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   ;(async () => {
  //     setLoading(true)
  //     try {
  //       const res = await apiConnector("GET", categories.CATEGORIES_API)
  //       setSubLinks(res.data.data)
  //     } catch(error) {
  //       console.log("Could not fetch Categories.", error)
  //     }
  //     setLoading(false)
  //   })()
  // }, [])

  function matchRoute(route){                                   // if route is matched with (current route) then return true and color of text turn yellow otherwise white;
    return matchPath({ path: route } , location.pathname)
  }



  return (
   <div className="navbar">
    <div className = {`flex h-14 items-center justify-center overflow-hidden  ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`} >
         
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        

        <Link to="/"> <img src = {logo} alt="Logo" width = {260} height = {52} loading = "lazy" className="navbarLogo"/> </Link>           {/* Logo */}


        <nav className="hidden md:block">                                                                    {/* Navigation links */}
          <ul className="flex gap-x-6 text-richblack-25">

              { NavbarLinks.map((link, index) => (

                  <li key = {index}>
                      { link.display==0 || toDispaly==1? (

                            <Link to = {link?.path}>
                            <p className = {` ${matchRoute(link?.path)? "text-yellow-25" : "text-richblack-25"} `}> {link.title}  </p>
                            </Link>
                                 

                            ) : (
                              <></>
                              )
                      }
                  </li>

                  ))
              }
              {user?.role==="Student" && <Link to="/chat-section"><p>Chat Section</p></Link>}
             
          </ul>
         
        </nav>




        {/* Login / Signup / Dashboard */}

        <div className="hidden items-center gap-x-4 md:flex">

            { user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (                  // if user is present(login) and user is not instructor then we show cart icon in place of login and signup;
                        <Link to = "/dashboard/cart" className="relative">
                          { totalItems > 0 && ( <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                                     {totalItems}                                      {/* no of item(courses) present in cart , we take it absolute because we want to overlap it over cart icon */}
                                                 </span>
                                              )
                          }
                        </Link> 
                      )
             }

                                                        {/* if token === null then user are not login so we show login icon and sign icon  */}

          { token === null && ( <Link to="/login"> 
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 commonButton">  Log in </button>                  
                               </Link>
                              )
           }

          { token === null && ( <Link to="/signup">
                                   <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 commonButton"> Sign up </button>
                                </Link>
                               )
           }

          { token !== null && <ProfileDropdown />}               {/* added profile dropdown if token is not equal to null means user is present*/}

        </div>

        <button className="mr-4 md:hidden">  <AiOutlineMenu fontSize={24} fill="#AFB2BF" />  </button>
       
      </div>
    </div>
    </div>
)}


export default Navbar