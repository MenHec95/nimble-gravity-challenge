import { useState, useEffect } from "react";
import { getJobs } from "./api/jobs";
import EmailForm from "./components/EmailForm";
import JobList from "./components/JobList";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [errorJobs, setErrorJobs] = useState(null);

  useEffect(() => {
    if (!candidate) return;
    const fetchJobs = async () => {
      setLoadingJobs(true);
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setErrorJobs(err.response?.data?.message || "Could not load job listings. Please try again later.");
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, [candidate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Nimble Gravity Job Application</h1>
      {!candidate ? (
        <EmailForm onCandidateFound={setCandidate} />
      ) : (
        <>
          <p className="mb-6 text-gray-600">Welcome, {candidate.firstName}!</p>
          {loadingJobs && <p>Loading jobs...</p>}
          {errorJobs && <p className="text-red-500">{errorJobs}</p>}
          {!loadingJobs && !errorJobs && <JobList jobs={jobs} candidate={candidate} />}
        </>
      )}
    </div>
  );
}

export default App;
