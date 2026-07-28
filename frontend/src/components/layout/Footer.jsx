import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Bakery */}
        <div>
          <h2 className="text-3xl font-bold text-pink-500">
            Usha Bakery
          </h2>

          <p className="text-gray-300 mt-4 leading-7">
            Freshly baked cakes, pastries, cookies and desserts
            made with love. We deliver happiness for every
            celebration.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-3">

            <a
              href="tel:+918171034916"
              className="flex items-center gap-3 hover:text-pink-400 transition"
            >
              <FaPhoneAlt />
              +91 8171034916
            </a>

            <a
              href="mailto:ushabisht942@gmail.com"
              className="flex items-center gap-3 hover:text-pink-400 transition"
            >
              <FaEnvelope />
              ushabisht942@gmail.com
            </a>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt />
              Bhowali, Nainital, Uttarakhand
            </div>

          </div>
        </div>

        {/* Opening Hours */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Opening Hours
          </h3>

          <div className="space-y-3 text-gray-300">

            <div className="flex gap-3 items-center">
              <FaClock />
              Mon - Sun
            </div>

            <p>9:00 AM – 9:00 PM</p>

            <p>Fresh Baking Every Day</p>

          </div>

        </div>

        {/* Social */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Follow Us
          </h3>

          <p className="text-gray-300 mb-5">
            Stay connected for offers, new cakes and festive specials.
          </p>

          <div className="flex gap-4">

            <a
              href="https://instagram.com/usha_home_bakery_bhowali"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-pink-600 hover:bg-pink-700 flex items-center justify-center transition"
            >
              <FaInstagram />
            </a>

           

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 py-6 text-center text-gray-400">

        © 2026 <span className="text-pink-500 font-semibold">Usha Bakery</span>.
        All Rights Reserved.
        <p>Designed & Developed by Abhinav Singh Bohra.</p>

      </div>

    </footer>
  );
}

export default Footer;