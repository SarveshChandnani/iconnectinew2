import { useRef , useState , useEffect} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "../Styles/main.css";

function Navbar(props) {
	const toShow = props.toShow;
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    callMainPage();
  }, []);

  const callMainPage = async () => {
    try {
      const res = await fetch("/mainscreen", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);

      setImageURL("http://localhost:3001/public/images/" + data.logo);
      
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<div className="logo-container">
        {toShow === "false" ? (
          <h3>LOGO</h3>
        ) : (
          <img src={imageURL} alt="Logo" className="logo-image" />
        )}
      </div>
			<nav ref={navRef}>
				<a href="/#">Home</a>
                <a href="/#">About</a>
				{/* <a href="/#">My work</a>
				<a href="/#">Blog</a> */}
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;