import "./ProfileUser.css";
import { useNavigate } from "react-router-dom";
function ProfileUser() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/profile");
  }
  return (
    <div className="user_profile_page">
      <div className="profile_card">
        <div className="profile_image">
           {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h2>{user?.name}</h2>
        <p className="username">@{user?.username}</p>

        <div className="profile_info">
          <div className="info_box">
            <span>📧 Email</span>
            <p>{user?.email}</p>
          </div>

          <div className="info_box">
            <span>📱 Phone</span>
            <p>{user?.phone}</p>
          </div>
        </div>

        <button className="edit_btn">Edit Profile</button>
        <button className="logout_btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileUser;
