import React from "react";

const Contact = () => {
  return (
    <div className="container Para mx-auto px-4 py-8 text-white">
      <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
      <form className="mb-8 p-6 UserInfo bg-transparent bgrounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 rounded bg-transparent border border-white focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 rounded bg-transparent border border-white focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-bold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full p-2 rounded bg-transparent border border-white focus:outline-none focus:ring focus:border-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#E55857] text-[#181818] py-2 px-4 rounded font-bold hover:transition-all hover:bg-[#EF5350]"
        >
          Send Message
        </button>
      </form>
      <div>
        <h3 className="text-xl font-bold mb-2">Contact Information:</h3>
        <p>Name: Anas Saif</p>
        <p>Phone: +91 9348418378</p>
        <p>Email: anassaif.507@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;
