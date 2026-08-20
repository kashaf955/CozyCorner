import { Link } from "react-router-dom";
import playStore from "../../assets/images/playstore.png";
import appStore from "../../assets/images/appstore.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a100e] px-6 py-10 text-mist-70 md:px-8 flex flex-col gap-4">
      <div class = "container flex justify-center gap-30 lg:gap-40">
     <div class = "leftfooter flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Download Our App</h2>
      <p>Download App for Android and IOS mobile phone</p>
      <div className="app-download h-15 rounded-md flex gap-4">
        <img src={playStore} alt="playstore" className="h-full w-auto object-contain" />
        <img src={appStore} alt="appstore" className="h-full w-auto object-contain" />
      </div>
     </div>
     <div class = "midfooter flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Useful Links</h2>
      <div className="footer-links flex flex-col gap-2">
        <Link to="/">About Us</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
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
