import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../actions/userAction.js";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants.js";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(
        user.avatar?.url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=3d6b54&color=fff`
      );
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
      navigate("/profile");
    }
  }, [error, isUpdated, alert, dispatch, navigate]);

  const handleAvatarChange = (e) => {
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
    const payload = { name, email };
    if (avatar) {
      payload.avatar = avatar;
    }
    dispatch(updateProfile(payload));
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <Metadata title="Edit Profile" />
      <div className="w-full max-w-md rounded-lg bg-[#15201c] p-8">
        <h1 className="font-display text-3xl text-mist">Edit Profile</h1>
        <p className="mt-2 text-mist-70">Update your name, email, or avatar.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="flex flex-col items-center gap-3">
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="h-24 w-24 rounded-full object-cover ring-2 ring-white/20"
            />
            <label htmlFor="avatar" className="cursor-pointer text-sm text-mist-70 underline underline-offset-4">
              Change avatar
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-mist-70">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-mist-70">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63] disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-mist-70">
          <Link to="/profile" className="text-mist underline underline-offset-4">
            Back to Profile
          </Link>
        </p>
      </div>
    </section>
  );
};

const UpdateProfile = () => (
  <ProtectedRoute>
    <UpdateProfileForm />
  </ProtectedRoute>
);

export default UpdateProfile;
