import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction.js";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  if (!user || typeof user !== "object" || Array.isArray(user)) {
    return null;
  }

  const avatarUrl =
    user?.avatar?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=3d6b54&color=fff`;

  const handleLogout = async () => {
    setOpen(false);
    await dispatch(logout());
    navigate("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 transition hover:border-white/50"
        aria-label="User menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <img
          src={avatarUrl}
          alt={user?.name || "Profile"}
          className="h-full w-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 min-w-40 overflow-hidden rounded-md border border-white/15 bg-[#15201c] shadow-lg">
          <p className="truncate border-b border-white/10 px-3 py-2 text-xs text-mist-70">
            {user?.name || "Account"}
          </p>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-mist transition hover:bg-white/10"
          >
            Profile
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full px-3 py-2 text-left text-sm text-mist transition hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserOptions;
