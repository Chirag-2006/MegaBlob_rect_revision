import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();

  function handleLogout() {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((err) => console.log("Error in logoutBtn: ", err));
  }

  return (
    <button className="inline-block px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutBtn;
