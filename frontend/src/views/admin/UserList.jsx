import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import ProtectedRoute from "../../components/layout/ProtectedRoute.jsx";
import Loader from "../../components/layout/loader.jsx";
import { useAlert } from "../../context/AlertContext.jsx";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  clearErrors,
} from "../../actions/adminAction.js";
import {
  UPDATE_USER_RESET,
  DELETE_USER_RESET,
} from "../../constants/adminConstants.js";

const UserListContent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { users, loading, error } = useSelector((state) => state.allUsers);
  const { isUpdated, isDeleted, error: userError } = useSelector((state) => state.userAdmin);
  const [roles, setRoles] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error || userError) {
      alert.error(error || userError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User updated");
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(getAllUsers());
    }
    if (isDeleted) {
      alert.success("User deleted");
      dispatch({ type: DELETE_USER_RESET });
      dispatch(getAllUsers());
    }
  }, [error, userError, isUpdated, isDeleted, alert, dispatch]);

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title="Admin Users" />
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl text-mist">Users</h1>
        {loading ? (
          <div className="mt-12 flex justify-center"><Loader /></div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-left text-sm text-mist">
              <thead className="bg-[#15201c] text-mist-70">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(users || []).map((u) => (
                  <tr key={u._id} className="border-t border-white/10">
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">
                      <select
                        className="rounded border border-white/20 bg-[#0f1714] px-2 py-1"
                        value={roles[u._id] || u.role}
                        onChange={(e) =>
                          setRoles((r) => ({ ...r, [u._id]: e.target.value }))
                        }
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="space-x-3 px-4 py-3">
                      <button
                        type="button"
                        className="text-leaf hover:underline"
                        onClick={() =>
                          dispatch(
                            updateUser(u._id, { name: u.name, email: u.email, role: roles[u._id] || u.role })
                          )
                        }
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="text-red-300 hover:underline"
                        onClick={() => {
                          if (window.confirm("Delete user?")) dispatch(deleteUser(u._id));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link to="/admin/dashboard" className="mt-6 inline-block text-sm text-mist underline">
          Back to dashboard
        </Link>
      </div>
    </section>
  );
};

const UserList = () => (
  <ProtectedRoute isAdmin>
    <UserListContent />
  </ProtectedRoute>
);

export default UserList;
