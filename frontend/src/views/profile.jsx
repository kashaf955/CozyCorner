import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";

const ProfileContent = () => {
  const { user } = useSelector((state) => state.user);
  const avatarUrl =
    user?.avatar?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=3d6b54&color=fff`;

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <Metadata title="My Profile" description="Your Cozy Corner profile" />
      <div className="w-full max-w-md rounded-lg bg-[#15201c] p-8 text-center">
        <img
          src={avatarUrl}
          alt={user?.name || "Profile"}
          className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-white/20"
        />
        <h1 className="font-display mt-6 text-3xl text-mist">{user?.name}</h1>
        <p className="mt-2 text-mist-70">{user?.email}</p>
        <p className="mt-1 text-sm capitalize text-white/50">Role: {user?.role || "user"}</p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/profile/update"
            className="rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
          >
            Edit Profile
          </Link>
          <Link
            to="/password/update"
            className="rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-mist transition hover:bg-white/10"
          >
            Change Password
          </Link>
          <Link
            to="/orders"
            className="rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-mist transition hover:bg-white/10"
          >
            My Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

const Profile = () => (
  <ProtectedRoute>
    <ProfileContent />
  </ProtectedRoute>
);

export default Profile;
