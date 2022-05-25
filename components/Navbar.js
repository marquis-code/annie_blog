import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUserCircle} from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar = () => {
  const [userToken, setUserToken] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    const storageUser = JSON.parse(localStorage.getItem("user"));
    if(storageUser) {
      setLoggedUser(storageUser.username)
    }
    setUserToken(storageToken);
  }, []);

  const toggleNavbar = () => {
    setShowNav(!showNav);
  };

  const handleLogout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     router.push('/signin')
  }
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          {/* <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg> */}
          <span className="font-semibold text-xl tracking-tight"><Link href="/"><a>Anni&#39;s Blog</a></Link></span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleNavbar}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {showNav && (
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className='flex items-center space-x-3'><span><FaUserCircle /></span><span className="font-medium text-white font-sans">{loggedUser ? loggedUser : 'User'}</span></div>
            <div className="text-sm lg:flex-grow">
              {!userToken ? (
                <>
                  <Link href="/signup">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                      Signup
                    </a>
                  </Link>
                  <Link href="/signin">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                      Signin
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/write">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                      write
                    </a>
                  </Link>
                  <div onClick={handleLogout}>
                    <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                      Logout
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
