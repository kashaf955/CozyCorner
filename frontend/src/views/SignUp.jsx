import SignUpComp from "../components/layout/SignUpComp.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import Metadata from "../components/layout/metadata.jsx";
const SignUp = () => {
  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Register" description="SignUp page" keywords="signup, page" />
      <Header />
      <SignUpComp />
      <Footer />
    </div>
  );
};

export default SignUp;
