import SignUpComp from "../components/layout/SignUpComp.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Header />
      <SignUpComp />
      <Footer />
    </div>
  );
};

export default SignUp;
