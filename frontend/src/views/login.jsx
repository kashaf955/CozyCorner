import Header from "../components/Header.jsx";
import Footer from "../components/footer.jsx";
import LoginComp from "../components/LoginComp.jsx";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Header />
      <LoginComp />
      <Footer />
    </div>
  );
};

export default Login;
