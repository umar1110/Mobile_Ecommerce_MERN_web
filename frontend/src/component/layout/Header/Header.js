import React, { useState, } from "react";
import { NavLink, Link,useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import {useSelector} from "react-redux"

const Header = () => {
  const {isAuthenticated} = useSelector(state=>state.user)
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  function removeSpecialCharacters(str) {
    return str.replace(/[^\w\s]/gi, '');
  }
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if ( keyword.trim()) {
      const temp =removeSpecialCharacters(keyword);
      navigate(`/products/${temp}`);
    } else {
      navigate("/products");
    }

    setMenuOpen(false)
  };
  // ////////////

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


const location = useLocation()
  const movePageStart = () => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className="header fixed top-0 left-0 z-10 right-0 flex flex-col">
        <nav className="nav-bar h-[65px] flex justify-between p-5 shadow nv:flex relative nv:items-center nv:justify-between    w-full  bg-cc ">
          <div className="flex justify-between items-center ">
            <Link to={"/"} onClick={movePageStart}>
              {" "}
              <h1 className="font-bold  cursor-pointer text-3xl">CellCave</h1>
            </Link>
          </div>

          <ul
            className={`nv:flex z-10 nv:items-center bg-cc nv:z-auto nv:static absolute w-full left-0 nv:w-auto nv:py-0 py-4 nv:pl-0 pl-7 transition-all ease-in duration-500 ${
              menuOpen ? "top-[80px] opacity-100" : "top-[-400px] "
            }`}
          >
            <li className="mx-4 my-6 nv:my-0">
              <NavLink
                onClick={toggleMenu}
                to={"/"}
                className="text-xl  hover:text-black duration-500"
              >
                HOME
              </NavLink>
            </li>

            <li className="mx-4 my-6 nv:my-0">
              <NavLink
                onClick={toggleMenu}
                to={"/products"}
                className="text-xl  hover:text-black duration-500"
              >
                PRODUCTS
              </NavLink>
            </li>
            <li className="mx-4 my-6 nv:my-0">
              <NavLink
                onClick={toggleMenu}
                to={"/contact"}
                className="text-xl hover:text-black duration-500"
              >
                CONTACT
              </NavLink>
            </li>
            <li className="mx-4 my-6 nv:my-0">
              <NavLink
                onClick={toggleMenu}
                to={"/about"}
                className="text-xl hover:text-black duration-500"
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              {/* Search Bar */}
              <div className="left md:hidden space-x-6 flex items-center mr-3">
                <div className="search-bar text-black relative mx-auto max-w-md">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.25em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </div>
                  <form onSubmit={searchSubmitHandler}>
                    <input
                      className="w-full h-10 pl-10 pr-5 text-xl placeholder-gray-500 placeholder-opacity-75 rounded-full border-2 border-gray-300 focus:outline-none focus:border-gray-400"
                      type="text"
                      placeholder="Search a Product ..."
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="left  md:flex space-x-6 hidden items-center mr-3">
            <div className="search-bar text-black hidden sb:flex relative mx-auto max-w-xs">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.25em"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>
              <form onSubmit={searchSubmitHandler}>
                <input
                  className="w-full h-10 pl-10 pr-5 text-xl placeholder-gray-500 placeholder-opacity-75 rounded-full border-2 border-gray-300 focus:outline-none focus:border-gray-400"
                  type="text"
                  placeholder="Search a Product ..."
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </form>
              {/* <input
                className="w-full h-10 pl-10 pr-5 text-xl placeholder-gray-500 placeholder-opacity-75 rounded-full border-2 border-gray-300 focus:outline-none focus:border-gray-400"
                type="text"
                placeholder="Search"
              /> */}
            </div>
            <div className="iconss hidden space-x-2 nv:flex text-4xl">
              <NavLink to={"/cart"}>
                {" "}
                <ion-icon name="cart"></ion-icon>
              </NavLink>
              <Link to={`${isAuthenticated ? '/account':'/login'}`}>
                {" "}
                <ion-icon name="person-circle-outline"></ion-icon>
              </Link>
            </div>
          </div>
          <span className=" space-x-3 text-4xl cursor-pointer mx-2 nv:hidden block">
            <NavLink to={"/cart"}>
              {" "}
              <ion-icon name="cart"></ion-icon>
            </NavLink>
            <NavLink to={`${isAuthenticated ? '/account':'/login'}`}>
              {" "}
              <ion-icon name="person-circle-outline"></ion-icon>
            </NavLink>

            <ion-icon
              name={menuOpen ? "close" : "menu"}
              onClick={toggleMenu}
            ></ion-icon>
          </span>
        </nav>

        {/* Rest of your code */}
      </div>
    </>
  );
};

export default Header;

// import React from "react";
// const Header = () => {
//   return (
//     <>
//       <div className="header flex flex-col">
//         <div className="nav-bar flex relative top-0 left-0 right-0 w-full justify-between  items-center h-[80px] text-white "
//           style={{ background: "rgb(233, 106, 15)" }}
//         >
//           <h1 className="font-bold text-3xl ml-2 mr-3">CellCave</h1>
//           <div className="right-nav items-center flex space-x-2 justify-between">
//             <ul
//               className=" nv:flex   hidden duration-500  font-semibold nv:space-x-8
//           space-x-4 text-xl"
//             >
//               <NavLink  to={"#"}>
//                 <li>Home</li>
//               </NavLink>
//               <NavLink  to={"#"}>
//                 <li>Products</li>
//               </NavLink>
//               <NavLink  to={"#"}>
//                 <li>Contact</li>
//               </NavLink>
//               <NavLink  to={"#"}>
//                 <li>About</li>
//               </NavLink>
//             </ul>
//           </div>
//           {/* Left side of Navbar */}
//           <div className="left space-x-6 flex items-center mr-3">
//             {/* Search Bar */}
//             <div className="search-bar hidden sb:flex relative mx-auto max-w-xs">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="1.25em"
//                   viewBox="0 0 512 512"
//                 >
//                   <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
//                 </svg>
//               </div>
//               <input
//                 className="w-full h-10 pl-10 pr-5 text-xl placeholder-gray-500 placeholder-opacity-75 rounded-full border-2 border-gray-300 focus:outline-none focus:border-orange-500"
//                 type="text"
//                 placeholder="Search"
//               />
//             </div>
//             {/* Cart */}
//             <NavLink  to={"#"}>
//               <svg
//                 style={{ fill: "white" }}
//                 xmlns="http://www.w3.org/2000/svg"
//                 height="1.8em"
//                 viewBox="0 0 576 512"
//               >
//                 <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c-2.2 11.3-12.1 19.5-23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
//               </svg>
//             </NavLink>
//             {/* Profile */}
//             <NavLink  to={"#"}>
//               <svg
//                 style={{ fill: "white" }}
//                 height="1.8em"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 448 512"
//               >
//                 <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
//               </svg>
//             </NavLink>
//             {/* Options Menu */}
//             <NavLink className="flex nv:hidden"  to={"#"}>
//               <svg
//                 style={{ fill: "white" }}
//                 height="1.8em"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 448 512"
//               >
//                 <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
//               </svg>
//             </NavLink>
//           </div>
//         </div>

//         {/* Search bar in mobile */}
//         <div className="search-bar sb:hidden  relative  w-full">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="1.25em"
//               viewBox="0 0 512 512"
//             >
//               <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
//             </svg>
//           </div>
//           <input
//             className="w-full  h-14 pl-10 pr-5 text-xl placeholder-gray-500 placeholder-opacity-75  border-2 border-gray-300 focus:outline-none focus:border-orange-500"
//             type="text"
//             placeholder="Search"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;
