import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const ProfileSetupAcademy = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    website: "",
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
      // Ensure user exists in Prisma
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: user?.clerkUserId,
          email: user?.email,
          name: user?.name,
          role: user?.role,
        }),
      });
  const payload = { ...form, userId: user?.id };
      const res = await fetch("/api/academy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/academy/dashboard");
      } else {
        alert("Failed to save academy profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Academy Profile Setup</h2>
      <input name="name" placeholder="Academy Name" value={form.name} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="input mb-2 w-full" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input mb-2 w-full" required />
      <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="input mb-2 w-full" />
  {/* Contact Email removed, not in schema */}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Saving..." : "Save Profile"}</button>
    </form>
  );
};

export default ProfileSetupAcademy;
