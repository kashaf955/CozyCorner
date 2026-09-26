import SignUpComp from "../components/layout/SignUpComp.jsx";
import Metadata from "../components/layout/metadata.jsx";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Register" description="SignUp page" keywords="signup, page" />
      <SignUpComp />
    </div>
  );
};

export default SignUp;
