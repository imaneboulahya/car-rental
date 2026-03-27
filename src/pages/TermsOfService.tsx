import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="w-16 h-1 bg-[#00d2ff] rounded-full mb-6 shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display">Terms of Service</h1>
          <p className="text-sm text-slate-500 font-light tracking-widest uppercase">
            Last Updated: March 27, 2026
          </p>
        </div>

        {/* Intro */}
        <section className="mb-10">
          <p className="leading-relaxed font-light text-slate-400">
            Welcome to <strong className="text-white">LuxeDrive Morocco</strong>. By accessing or using our
            vehicle rental services, website, or mobile application, you agree to be bound by these Terms of
            Service. Please read them carefully before making a reservation.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-[#00d2ff] font-black">01.</span> Eligibility
          </h2>
          <ul className="list-disc ml-6 space-y-2 font-light text-slate-400">
            <li>You must be at least <strong className="text-white">21 years of age</strong> to rent a vehicle.</li>
            <li>You must hold a valid driver's license issued in Morocco or internationally recognized.</li>
            <li>A valid national ID or passport is required at the time of vehicle collection.</li>
            <li>A credit or debit card in the renter's name must be provided for the security deposit.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-[#00d2ff] font-black">02.</span> Reservations & Payments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h3 className="text-[#00d2ff] font-bold mb-2">Booking Confirmation</h3>
              <p className="text-sm font-light text-slate-400">
                All reservations are subject to vehicle availability. A booking is only confirmed once you receive
                an official confirmation email from LuxeDrive.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h3 className="text-[#00d2ff] font-bold mb-2">Pricing</h3>
              <p className="text-sm font-light text-slate-400">
                All prices are listed in Moroccan Dirhams (DH) and include standard insurance. Additional services
                (GPS, child seat, etc.) may incur extra charges.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-[#00d2ff] font-black">03.</span> Cancellation Policy
          </h2>
          <p className="font-light text-slate-400 mb-4">
            We understand plans can change. Our cancellation policy is as follows:
          </p>
          <div className="space-y-3">
            {[
              { time: '72+ hours before pickup', outcome: 'Full refund — no charge.' },
              { time: '24–72 hours before pickup', outcome: '50% of the total rental cost is charged.' },
              { time: 'Less than 24 hours', outcome: 'Full rental cost applies — no refund.' },
              { time: 'No-show', outcome: 'Full rental cost applies — no refund.' },
            ].map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <span className="text-white font-semibold text-sm min-w-[200px]">{row.time}</span>
                <span className="text-slate-400 text-sm font-light">{row.outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-[#00d2ff] font-black">04.</span> Vehicle Use & Restrictions
          </h2>
          <ul className="list-disc ml-6 space-y-2 font-light text-slate-400">
            <li>The vehicle may only be driven by the registered renter unless additional drivers are declared and approved.</li>
            <li>Vehicles must not be used for racing, off-road driving (unless booked for off-road), or any illegal activity.</li>
            <li>Smoking is strictly prohibited in all vehicles. A cleaning fee of <strong className="text-white">500 DH</strong> applies for violations.</li>
            <li>Pets are not allowed without prior written consent from LuxeDrive.</li>
            <li>Cross-border travel requires prior written authorization and may involve additional fees.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-[#00d2ff] font-black">05.</span> Insurance & Liability
          </h2>
          <p className="leading-relaxed font-light text-slate-400 border-l-2 border-[#00d2ff]/40 pl-5 italic">
            All vehicles are covered by third-party liability insurance in accordance with Moroccan law.
            The renter is liable for any damage not covered by the selected insurance plan, including
            damage caused by negligence, speeding, or DUI.
          </p>
          <p className="mt-4 font-light text-slate-400">
            In the event of an accident, the renter must:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-2 font-light text-slate-400">
            <li>Immediately contact LuxeDrive's 24/7 support line.</li>
            <li>File an official police report (constat amiable).</li>
            <li>Not admit liability at the scene without consulting LuxeDrive.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-[#00d2ff] font-black">06.</span> Governing Law
          </h2>
          <p className="leading-relaxed font-light text-slate-400">
            These Terms of Service are governed by and construed in accordance with the laws of the
            <strong className="text-white"> Kingdom of Morocco</strong>. Any disputes arising from these terms
            shall be subject to the exclusive jurisdiction of the courts of Oujda, Morocco.
          </p>
        </section>

        {/* Contact Box */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mt-16">
          <h2 className="text-xl font-semibold text-white mb-4">Questions About These Terms?</h2>
          <p className="font-light text-slate-400 mb-4">
            If you have any questions or concerns regarding our Terms of Service, please reach out to us:
          </p>
          <div className="space-y-1">
            <p className="text-[#00d2ff]">Email: locationvoiture@gmail.com</p>
            <p className="text-sm text-slate-400">Phone: +212 6 53 90 46 65</p>
            <p className="text-sm text-slate-400">Address: Oujda, Morocco</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsOfService;
