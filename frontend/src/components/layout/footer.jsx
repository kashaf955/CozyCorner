import { Link } from "react-router-dom";
import playStore from "../../assets/images/playstore.png";
import appStore from "../../assets/images/appstore.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a100e] px-6 py-10 text-mist-70 md:px-8 flex flex-col gap-4">
      <div class = "container flex justify-center gap-30 lg:gap-40 py-10">
     <div class = "leftfooter flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Download Our App</h2>
      <p>Download App for Android and IOS mobile phone</p>
      <div className="app-download h-15 rounded-md flex gap-4">
        <img src={playStore} alt="playstore" className="h-full w-auto object-contain" />
        <img src={appStore} alt="appstore" className="h-full w-auto object-contain" />
      </div>
     </div>
     <div class = "midfooter flex flex-col gap-2 items-center">
      <h2 className="text-3xl font-bold text-leaf-500">Cozy Corner</h2>
      <h3 className="text-xl font-bold text-leaf-500 mb-2">Follow Us</h3>
      <div className="footer-links flex gap-2">
        <Link to="/" className="hover:text-white flex items-center gap-2"icon={<FaFacebook />} title="Facebook"><FaFacebook /></Link>
        <Link to="/" className="hover:text-white flex items-center gap-2"icon={<FaTwitter />} title="Twitter"><FaTwitter /></Link>
        <Link to="/" className="hover:text-white flex items-center gap-2"icon={<FaInstagram />} title="Instagram"><FaInstagram /></Link>
        <Link to="/" className="hover:text-white flex items-center gap-2"icon={<FaLinkedin />} title="LinkedIn"><FaLinkedin /></Link>
      </div>
     </div>
     <div class = "rightfooter flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      <div className="footer-links flex flex-col gap-2">
        <p>Address: 123 Main St, Anytown, USA</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@example.com</p>
      </div>
     </div>
     </div>
     <div class = "bottomfooter flex flex-col items-center justify-center">
      <p className="text-center text-mist-70">Copyright © 2026 CozyCorner. All rights reserved.</p>
     </div>
    </footer>
  );
};

export default Footer;
