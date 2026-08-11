import SignUpComp from "../components/SignUpComp.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/footer.jsx";

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
