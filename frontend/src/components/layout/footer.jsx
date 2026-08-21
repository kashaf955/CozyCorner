import { Link } from "react-router-dom";
import playStore from "../../assets/images/playstore.png";
import appStore from "../../assets/images/appstore.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a100e] px-6 py-10 text-mist-70 md:px-8 flex flex-col gap-4">
      <div className="container flex flex-col items-center justify-center gap-10 py-10 lg:flex-row lg:items-start lg:gap-40">
        <div className="leftfooter flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-mist">Download Our App</h2>
          <p>Download App for Android and IOS mobile phone</p>
          <div className="mt-2 flex items-center gap-4">
            <img
              src={playStore}
              alt="Get it on Google Play"
              className="h-12 w-36 rounded-md object-contain"
            />
            <img
              src={appStore}
              alt="Download on the App Store"
              className="h-12 w-36 rounded-md object-contain"
            />
          </div>
        </div>

        <div className="midfooter flex flex-col items-center gap-2">
          <h2 className="text-3xl font-bold text-mist">Cozy Corner</h2>
          <h3 className="mb-2 text-xl font-bold text-mist">Follow Us</h3>
          <div className="footer-links flex gap-4 text-xl">
            <Link to="/" className="hover:text-white" title="Facebook">
              <FaFacebook />
            </Link>
            <Link to="/" className="hover:text-white" title="Twitter">
              <FaTwitter />
            </Link>
            <Link to="/" className="hover:text-white" title="Instagram">
              <FaInstagram />
            </Link>
            <Link to="/" className="hover:text-white" title="LinkedIn">
              <FaLinkedin />
            </Link>
          </div>
        </div>

        <div className="rightfooter flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-mist">Contact Us</h2>
          <div className="footer-links flex flex-col gap-2">
            <p>Address: 123 Main St, Anytown, USA</p>
            <p>Phone: 123-456-7890</p>
            <p>Email: info@example.com</p>
          </div>
        </div>
      </div>

      <div className="bottomfooter flex flex-col items-center justify-center">
        <p className="text-center text-mist-70">
          Copyright © 2026 CozyCorner. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
