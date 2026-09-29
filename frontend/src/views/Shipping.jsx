import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import { saveShippingInfo } from "../actions/cartAction.js";

const ShippingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode: Number(pinCode),
        phoneNo: Number(phoneNo),
      })
    );
    navigate("/confirm");
  };

  const fieldClass =
    "w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]";

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <Metadata title="Shipping" />
      <div className="w-full max-w-md rounded-lg bg-[#15201c] p-8">
        <h1 className="font-display text-3xl text-mist">Shipping Info</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className={fieldClass} placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input className={fieldClass} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input className={fieldClass} placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
          <input className={fieldClass} placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
          <input className={fieldClass} type="number" placeholder="Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
          <input className={fieldClass} type="number" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
          <button type="submit" className="w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63]">
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

const Shipping = () => (
  <ProtectedRoute>
    <ShippingForm />
  </ProtectedRoute>
);

export default Shipping;
