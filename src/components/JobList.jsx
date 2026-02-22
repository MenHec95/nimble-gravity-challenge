import JobItem from "./JobItem";

function JobList({ jobs, candidate }) {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}

export default JobList;
