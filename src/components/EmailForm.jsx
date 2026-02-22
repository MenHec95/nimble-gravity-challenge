import { useState } from "react";
import { getCandidateByEmail } from "../api/candidate";

function EmailForm({ onCandidateFound }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const candidate = await getCandidateByEmail(email);
      onCandidateFound(candidate);
    } catch (err) {
      setError(err.response?.data?.message || "Could not find candidate. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded px-4 py-2 w-80" />
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

export default EmailForm;
