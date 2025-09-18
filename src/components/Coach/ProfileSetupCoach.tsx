import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const ProfileSetupCoach = () => {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    experience: "",
    specialization: "",
    sport: "",
    contactEmail: "",
  });
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ensure user exists in DB
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          name: user?.name,
          role: user?.role,
        }),
      });
      const payload = { ...form, userId: user?._id };
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/coach/dashboard");
      } else {
        alert("Failed to save coach profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Coach Profile Setup</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input mb-2 w-full" required />
      <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="experience" placeholder="Experience (years)" value={form.experience} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="sport" placeholder="Sport" value={form.sport} onChange={handleChange} className="input mb-2 w-full" />
      <input name="contactEmail" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} className="input mb-2 w-full" />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Saving..." : "Save Profile"}</button>
    </form>
  );
};

export default ProfileSetupCoach;
