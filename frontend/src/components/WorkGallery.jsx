import { motion } from "framer-motion";

import cake1 from "../assets/gallery/cake1.jpg";
import cake2 from "../assets/gallery/cake2.jpg";
import cake3 from "../assets/gallery/cake3.jpg";
import cake4 from "../assets/gallery/cake4.jpg";
import cake5 from "../assets/gallery/cake5.jpg";
import cake6 from "../assets/gallery/cake6.jpg";

const images = [
  cake1,
  cake2,
  cake3,
  cake4,
  cake5,
  cake6,
];

export default function WorkGallery() {
  return (
    <section className="py-20 bg-white overflow-hidden">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold text-gray-800">
          Our Sweet Creations
        </h2>

        <p className="mt-3 text-gray-500">
          Every cake tells a story. Here are some of our favourite creations.
        </p>

      </div>

      <motion.div
        className="flex gap-6"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Cake"
            className="w-80 h-64 object-cover rounded-3xl shadow-xl flex-shrink-0 hover:scale-105 transition duration-300"
          />
        ))}
      </motion.div>

    </section>
  );
}