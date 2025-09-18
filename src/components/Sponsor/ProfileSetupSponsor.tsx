import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const ProfileSetupSponsor = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    bio: "",
    website: "",
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
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/sponsor/dashboard");
      } else {
        alert("Failed to save sponsor profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sponsor Profile Setup</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="input mb-2 w-full" required />
      <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="input mb-2 w-full" />
      <input name="contactEmail" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} className="input mb-2 w-full" />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Saving..." : "Save Profile"}</button>
    </form>
  );
};

export default ProfileSetupSponsor;
