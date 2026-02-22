import { useState } from "react";
import { applyToJob } from "../api/candidate";

function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!repoUrl.trim()) {
      setError("Please enter your GitHub repository URL.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      {success ? (
        <p className="text-green-600 font-medium">Application submitted successfully!</p>
      ) : (
        <>
          <input type="text" placeholder="Enter your GitHub repository URL" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} className="border border-gray-300 rounded px-4 py-2" />
          <button onClick={handleSubmit} disabled={loading || !repoUrl.trim()} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 self-start">
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      )}
    </div>
  );
}

export default JobItem;
