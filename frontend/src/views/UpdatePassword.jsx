import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { updatePassword, clearErrors } from "../actions/userAction.js";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants.js";

const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password updated successfully");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      navigate("/profile");
    }
  }, [error, isUpdated, alert, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    );
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <Metadata title="Change Password" />
      <div className="w-full max-w-md rounded-lg bg-[#15201c] p-8">
        <h1 className="font-display text-3xl text-mist">Change Password</h1>
        <p className="mt-2 text-mist-70">Choose a new password for your account.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="oldPassword" className="mb-1.5 block text-sm text-mist-70">
              Current password
            </label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="mb-1.5 block text-sm text-mist-70">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="mb-1.5 block text-sm text-mist-70"
            >
              Confirm new password
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63] disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

const UpdatePassword = () => (
  <ProtectedRoute>
    <UpdatePasswordForm />
  </ProtectedRoute>
);

export default UpdatePassword;
