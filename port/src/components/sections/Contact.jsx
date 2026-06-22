'use client';

import React, { useState } from 'react';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Message sent successfully ✨');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6 py-20">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#999D9E]/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#999D9E]/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* Left Side */}
        <div className="space-y-8">

          <p className="uppercase tracking-[6px] text-sm text-[#999D9E]">
            Luxury Concierge
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-none tracking-tight">
            LET'S START <br />
            A PROJECT{' '}
            <span className="text-[#4C5FD7] italic">
              TOGETHER
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-md leading-8">
           Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.


          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-6">

            <div style={{
            padding: "15px"
        }} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
              <p className="text-xs text-gray-500 mb-2 tracking-widest">
                CALL US
              </p>
              <p className="text-[#999D9E] text-lg">
                +92 300 1234567
              </p>
            </div>

            <div style={{
            padding: "15px"
        }} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
              <p className="text-xs text-gray-500 mb-2 tracking-widest">
                EMAIL
              </p>
              <p  className="text-[#999D9E] text-lg">
                nubairahmed0@gmail.com
              </p>
            </div>

          </div>
        </div>

        {/* Form */}
        <div style={{
            padding: "20px"
        }} className=" bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 lg:p-12 shadow-[0_0_50px_rgba(153,157,158,0.1)]">

          <form onSubmit={handleSubmit} className="space-y-9 ">

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label style={{
            padding: "15px"
        }} className="text-xs text-gray-400 tracking-[3px] block mb-3">
                  NAME
                </label>

                <input style={{
            padding: "15px"
        }}
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe *"
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#999D9E] transition-all focus:shadow-[0_0_20px_rgba(153,157,158,0.4)]"
                />
              </div>

              <div>
                <label style={{
            padding: "15px"
        }} className="text-xs text-gray-400 tracking-[3px] block mb-3">
                  EMAIL
                </label>

                <input style={{
            padding: "15px"
        }}
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.@doe.com *"
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#999D9E] transition-all focus:shadow-[0_0_20px_rgba(153,157,158,0.4)]"
                />
              </div>

            </div>

            <div>
              <label style={{
            padding: "15px"
        }} className="text-xs text-gray-400 tracking-[3px] block mb-3">
                PHONE
              </label>

              <input style={{
            padding: "15px"
        }}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className="w-full bg-black/40 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#999D9E] transition-all focus:shadow-[0_0_20px_rgba(153,157,158,0.4)]"
              />
            </div>

            <div>
              <label style={{
            padding: "15px"
        }} className="text-xs text-gray-400 tracking-[3px] block mb-3">
                MESSAGE
              </label>

              <textarea style={{
            padding: "15px"
        }}
                rows={6}
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your dream project..."
                className="w-full bg-black/40 border border-gray-700 rounded-2xl p-5 outline-none resize-none focus:border-[#999D9E] transition-all focus:shadow-[0_0_20px_rgba(153,157,158,0.4)]"
              />
            </div>

            <button style={{
            padding: "15px"
        }}
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                py-5
                rounded-2xl
                bg-[#999D9E]
                text-black
                font-medium
                tracking-[4px]
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-white
                hover:shadow-[0_0_30px_rgba(153,157,158,0.5)]
              "
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE ✦'}
            </button>

          </form>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[5px] text-gray-600">
        CONFIDENTIAL • EXCLUSIVE • TIMELESS
      </div>

    </div>
  );
};

export default ContactPage;