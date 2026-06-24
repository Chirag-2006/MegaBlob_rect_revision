import { useSelector } from "react-redux";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { status : authStatus, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];

    console.log(authStatus)
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex justify-between items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>
          <div className="">
            <h1 className="text-2xl font-bold">{userData && userData.name}</h1>
          </div>
          <ul className="flex ml-auto space-x-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="px-4 py-2 cursor-pointer bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    onClick={() => navigate(item.path)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
