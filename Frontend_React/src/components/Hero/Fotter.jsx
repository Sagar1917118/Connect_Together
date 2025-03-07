import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-10 bg-indigo-200">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-11/12 mx-auto"
      >
        <div className="flex flex-wrap justify-between gap-8">
          {/* first section */}
          <div className="space-y-4 max-w-[400px]">
            <h1 className="text-3xl font-bold text-indigo-600">Connect Together</h1>
            <p className="font-poppins">
            Connect Together bridges parents, teachers, and students for seamless communication.
             It streamlines attendance, homework, payments, and progress tracking while fostering 
             engagement through blogs, games, and community support
            </p>
          </div>
          {/* second section */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
            <h1 className="text-3xl font-bold text-indigo-600">Links</h1>
              <div className="text-dark2">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Homweork
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Marks
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Attendance
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Community
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* third section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-3xl font-bold text-indigo-600">Get In Touch</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                className="p-3 rounded-s-xl bg-white w-full py-4 focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <button className="bg-yellow-400 text-white font-semibold py-4 px-6 rounded-e-xl">
                Go
              </button>
            </div>
            {/* social icons */}
            <div className="flex space-x-6 py-3">
              <a href="#">
                <FaWhatsapp className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="#">
                <FaInstagram className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="#">
                <TbWorldWww className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="#">
                <FaYoutube className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
