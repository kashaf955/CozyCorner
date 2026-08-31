import { TailSpin } from "react-loader-spinner";

const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen" : "py-20"
      }`}
    >
      <TailSpin color="#3d6b54" height={50} width={50} />
    </div>
  );
};

export default Loader;
