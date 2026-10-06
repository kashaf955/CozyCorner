import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import { useAlert } from "../../context/AlertContext.jsx";
import { createUser, clearErrors } from "../../actions/adminAction.js";
import { NEW_USER_RESET } from "../../constants/adminConstants.js";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, success, error } = useSelector((state) => state.newUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("User created");
      dispatch({ type: NEW_USER_RESET });
      navigate("/admin/users");
    }
  }, [error, success, alert, dispatch, navigate]);

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email, password, role };
    if (avatar) payload.avatar = avatar;
    dispatch(createUser(payload));
  };

  const fieldClass =
    "w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]";

  return (
    <div className="mx-auto max-w-lg">
      <Metadata title="New User" />
      <h1 className="font-display text-3xl text-mist">New User</h1>
      <p className="mt-2 text-sm text-mist-70">
        Create a customer or admin account from the dashboard.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-lg border border-white/10 bg-[#15201c] p-6"
      >
        <input
          className={fieldClass}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={fieldClass}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={fieldClass}
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
        <select
          className={fieldClass}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <div>
          <label className="mb-2 block text-sm text-mist-70">
            Avatar (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="text-sm text-mist-70"
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt=""
              className="mt-3 h-16 w-16 rounded-full object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white hover:bg-[#4a7d63] disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default NewUser;
