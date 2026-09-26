import LoginComp from "../components/layout/LoginComp.jsx";
import Metadata from "../components/layout/metadata.jsx";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Login" description="Login page" keywords="login, page" />
      <LoginComp />
    </div>
  );
};

export default Login;
