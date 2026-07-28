import { useState } from "react";
import { FaBirthdayCake, FaUpload } from "react-icons/fa";

function CustomizeCake() {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    weight: "",
    flavour: "",
    cakeMessage: "",
    instructions: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    console.log(image);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 py-12 px-6">

      {/* Hero */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <FaBirthdayCake className="text-6xl text-pink-600 mx-auto mb-4" />

        <h1 className="text-5xl font-extrabold text-gray-800">
          Design Your Dream Cake
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Freshly baked • Fully customized • Made with love ❤️
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* Name */}
          <div>
            <label className="font-semibold">
              Customer Name
            </label>

            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="9876543210"
              required
            />
          </div>

          {/* Weight */}
          <div>
            <label className="font-semibold">
              Cake Weight
            </label>

            <select
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              required
            >
              <option value="">Select Weight</option>
              <option>500 gm</option>
              <option>1 Kg</option>
              <option>1.5 Kg</option>
              <option>2 Kg</option>
              <option>3 Kg</option>
              <option>Custom</option>
            </select>
          </div>

          {/* Flavour */}
          <div>
            <label className="font-semibold">
              Flavour
            </label>

            <select
              name="flavour"
              value={formData.flavour}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              required
            >
              <option value="">Select Flavour</option>
              <option>Chocolate</option>
              <option>Black Forest</option>
              <option>Butterscotch</option>
              <option>Vanilla</option>
              <option>Red Velvet</option>
              <option>Pineapple</option>
              <option>Blueberry</option>
              <option>Custom</option>
            </select>
          </div>

          {/* Cake Message */}
          <div className="md:col-span-2">
            <label className="font-semibold">
              Cake Message
            </label>

            <input
              type="text"
              name="cakeMessage"
              value={formData.cakeMessage}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Happy Birthday❤️"
            />
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <label className="font-semibold">
              Special Instructions
            </label>

            <textarea
              rows="4"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Describe your dream cake..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">
              Delivery Date
            </label>

            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-semibold">
              Delivery Time
            </label>

            <input
              type="time"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              required
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="font-semibold flex items-center gap-2">
              <FaUpload />
              Reference Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full mt-2"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition"
            >
              Submit Custom Cake Request
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default CustomizeCake;