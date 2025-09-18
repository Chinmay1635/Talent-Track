import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const ProfileSetupAthlete = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sport: "",
    region: "",
    level: "",
    bio: "",
    contactEmail: "",
  });
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!user?._id) {
      setError('User not loaded. Please refresh and try again.');
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, userId: user._id };
      const res = await fetch("/api/athlete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/athlete/dashboard");
      } else {
        setError("Failed to save athlete profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Athlete Profile Setup</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="sport" placeholder="Sport" value={form.sport} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="region" placeholder="Region" value={form.region} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="level" placeholder="Level (Beginner/Intermediate/Pro)" value={form.level} onChange={handleChange} className="input mb-2 w-full" required />
      <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="contactEmail" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} className="input mb-2 w-full" />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Saving..." : "Save Profile"}</button>
    </form>
  );
};

export default ProfileSetupAthlete;
