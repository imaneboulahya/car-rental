import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 font-display">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12 font-light tracking-widest uppercase">
          Last Updated: March 27, 2026
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
          <p className="leading-relaxed font-light">
            Welcome to <strong>LuxeDrive Morocco</strong>. We are committed to protecting your personal data and your privacy. 
            This document informs you of our policies regarding the collection, use, and disclosure of personal data 
            when you use our Service and the choices you have associated with that data in accordance with 
            <strong> Moroccan Law No. 09-08</strong>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">2. Data We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h3 className="text-brand-accent font-bold mb-2">Location Data</h3>
              <p className="text-sm font-light">We collect precise real-time geographic coordinates (GPS) of the vehicles to provide our tracking and security services.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h3 className="text-brand-accent font-bold mb-2">Personal Identity</h3>
              <p className="text-sm font-light">Name, phone number, and email address provided during account registration or booking.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">3. Use of Data</h2>
          <p className="mb-4 font-light">We use the collected data for various purposes:</p>
          <ul className="list-disc ml-6 space-y-2 font-light">
            <li>To provide and maintain the vehicle location service.</li>
            <li>To notify you about changes to our service.</li>
            <li>To provide customer support and manage bookings.</li>
            <li>To monitor the usage of the Service for security and maintenance.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">4. CNDP Compliance & Data Rights</h2>
          <p className="leading-relaxed font-light italic border-l-2 border-brand-accent pl-4">
            The processing of personal data by LuxeDrive is carried out in accordance with Law No. 09-08 
            relating to the protection of individuals with regard to the processing of personal data.
          </p>
          <p className="mt-4 font-light">Under this law, you have the following rights:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2 font-light">
            <li><strong>Right of Access:</strong> You can request a copy of your personal data.</li>
            <li><strong>Right of Rectification:</strong> You can request correction of inaccurate data.</li>
            <li><strong>Right of Opposition:</strong> You can object to the processing of your data for legitimate reasons.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">5. Data Retention</h2>
          <p className="leading-relaxed font-light">
            We will retain your Personal Data only for as long as is necessary for the purposes set out in 
            this Privacy Policy and to comply with legal requirements in the Kingdom of Morocco.
          </p>
        </section>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mt-16">
          <h2 className="text-xl font-semibold text-white mb-4">Contact Our Privacy Team</h2>
          <p className="font-light mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
          <div className="space-y-1">
            <p className="text-brand-accent">Email: ocationvoiture@gmail.com</p>
            <p className="text-sm">Address: Oujda, Morocco</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;