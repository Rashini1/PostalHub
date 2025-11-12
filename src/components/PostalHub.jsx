import React, { useState } from "react";

export default function SriLankaPost() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [weight, setWeight] = useState(0.5);
  const [zone, setZone] = useState("Local");

  const offices = [
    { id: 1, name: "Colombo GPO", address: "17-19, Janadhipathi Mawatha, Colombo 1" },
    { id: 2, name: "Kandy Main Post Office", address: "Kandy Central" },
    { id: 3, name: "Galle Post Office", address: "Galle Fort" },
  ];

  const services = [
    "Letter Mail",
    "Parcel Service",
    "EMS (Express Mail Service)",
    "Registered Mail",
    "PO Box Service",
  ];

  function handleTrack(e) {
    e.preventDefault();
    // mock tracking logic — replace with real API calls if available
    if (!trackingId.trim()) {
      setTrackingResult({ status: "error", message: "Please enter a tracking ID." });
      return;
    }

    
    const hash = Array.from(trackingId).reduce((s, c) => s + c.charCodeAt(0), 0);
    const statuses = [
      "In Transit",
      "Out for Delivery",
      "Delivered",
      "Arrived at Sorting Center",
      "Awaiting Customs Clearance",
    ];
    const idx = hash % statuses.length;

    setTrackingResult({ status: "ok", trackingId, current: statuses[idx], history: [
      { date: "2025-11-10", location: "Colombo Sorting Center", desc: "Processed" },
      { date: "2025-11-11", location: "Transit", desc: statuses[idx] },
    ] });
  }

  function calcPostage() {
    // simple mock postage calculation
    const base = zone === "Local" ? 50 : zone === "Asia" ? 200 : 350;
    const unit = 50; // per 0.5kg
    const units = Math.max(1, Math.ceil((weight / 0.5)));
    return base + (units - 1) * unit;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="  text-blue-600 font-bold rounded-md px-3 py-2">POSTALHUB</div>
            <div>
              <h1 className="text-lg font-semibold">PostalHub - Modern Postal Service</h1>
              <p className="text-sm text-slate-500">Modern postal services</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#track" className="hover:text-blue-600">Track</a>
            <a href="#rates" className="hover:text-blue-600">Postage Rates</a>
            <a href="#offices" className="hover:text-blue-600">Post Offices</a>
          </nav>
          <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Contact</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold mb-3">Reliable postal services across Sri Lanka</h2>
            <p className="text-slate-600 mb-6">
              Track packages, calculate postage, and find post offices —  
            </p>
            <div className="flex gap-3">
              <a href="#track" className="bg-blue-600 text-white px-4 py-2 rounded-md">Track a Parcel</a>
              <a href="#services" className="border border-slate-300 px-4 py-2 rounded-md">View Services</a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Quick Track</h3>
            <form onSubmit={handleTrack} className="flex gap-2 flex-col sm:flex-row">
              <input
                aria-label="tracking id"
                className="flex-1 border rounded-md px-3 py-2"
                placeholder="Enter tracking ID e.g. SL123456789"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Track</button>
            </form>

            {trackingResult && (
              <div className="mt-4 bg-slate-50 border rounded-md p-3">
                {trackingResult.status === "error" ? (
                  <p className="text-red-600">{trackingResult.message}</p>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600">Tracking ID: <span className="font-medium">{trackingResult.trackingId}</span></p>
                    <p className="mt-2">Current Status: <strong>{trackingResult.current}</strong></p>
                    <ul className="mt-2 text-sm space-y-1">
                      {trackingResult.history.map((h, i) => (
                        <li key={i} className="text-slate-600">{h.date} — {h.location} — {h.desc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-4">Our Services</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold">{s}</h4>
              <p className="text-sm text-slate-500 mt-2">Reliable service with tracking and proof of delivery.</p>
              <div className="mt-3">
                <button className="text-sm text-blue-600">Learn more</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Postage Rates */}
      <section id="rates" className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Postage Calculator</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-600">Weight (kg)</label>
                <input type="number" step="0.1" min="0.1" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} className="mt-1 border rounded-md px-3 py-2 w-40" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Destination Zone</label>
                <select value={zone} onChange={(e) => setZone(e.target.value)} className="mt-1 border rounded-md px-3 py-2 w-48">
                  <option>Local</option>
                  <option>Asia</option>
                  <option>International</option>
                </select>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm">Estimated Postage: <span className="font-semibold">Rs {calcPostage()}</span></p>
                <p className="text-xs text-slate-500 mt-1">This is an estimated calculation.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Fast Tips</h3>
            <ul className="list-disc list-inside text-slate-600">
              <li>Use registered mail for important documents.</li>
              <li>Choose EMS for faster international delivery.</li>
              <li>Pack items securely to avoid damage.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Post Offices */}
      <section id="offices" className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-4">Nearby Post Offices</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {offices.map((o) => (
            <div key={o.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold">{o.name}</h4>
              <p className="text-sm text-slate-500">{o.address}</p>
              <div className="mt-3 flex gap-2">
                <button className="text-sm px-3 py-1 border rounded-md">View on Map</button>
                <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md">Get Directions</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-semibold">  PostalHub</p>
            <p className="text-sm text-slate-500" >© 2025 PostalHub.  </p>
          </div>
           
        </div>
      </footer>
    </div>
  );
}
