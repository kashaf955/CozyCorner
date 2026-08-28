import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import LoginComp from "../components/layout/LoginComp.jsx";
import Metadata from "../components/layout/metadata.jsx";
const Login = () => {
  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Login" description="Login page" keywords="login, page" />
      <Header />
      <LoginComp />
      <Footer />
    </div>
  );
};

export default Login;
