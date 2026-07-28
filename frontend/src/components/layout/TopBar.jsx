import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function TopBar() {
  return (
    <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 text-white text-sm">

      <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col md:flex-row justify-between items-center gap-2">

        <div className="flex flex-wrap items-center gap-6">

          <a
            href="tel:+918171034916"
            className="flex items-center gap-2 hover:text-yellow-200 transition"
          >
            <FaPhoneAlt />
            +91 8171034916
          </a>

          <a
            href="mailto:ushabisht942@gmail.com"
            className="flex items-center gap-2 hover:text-yellow-200 transition"
          >
            <FaEnvelope />
            ushabisht942@gmail.com
          </a>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            Bhowali, Nainital, Uttarakhand
          </div>

        </div>

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <FaClock />
            Open: 9:00 AM - 9:00 PM
          </div>

         <a
  href="https://instagram.com/usha_home_bakery_bhowali"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:text-yellow-200 transition font-medium"
>
  <FaInstagram className="text-lg" />
  @usha_home_bakery_bhowali
</a>
        </div>

      </div>

    </div>
  );
}

export default TopBar;