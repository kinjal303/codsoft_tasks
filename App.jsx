import { useState } from "react";
import "./App.css";

const starterJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Pune",
    type: "Full Time",
    salary: "₹4 - ₹7 LPA",
    experience: "0-2 Years",
    category: "Development",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    description:
      "Build responsive web applications and reusable frontend components.",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Python Developer",
    company: "DataSphere Labs",
    location: "Mumbai",
    type: "Internship",
    salary: "₹15,000/month",
    experience: "Fresher",
    category: "Development",
    skills: ["Python", "SQL", "Git"],
    description:
      "Work on Python applications, APIs and data processing solutions.",
    posted: "3 days ago"
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Analytics Hub",
    location: "Remote",
    type: "Remote",
    salary: "₹4 - ₹6 LPA",
    experience: "0-2 Years",
    category: "Data",
    skills: ["Python", "Excel", "SQL", "Power BI"],
    description:
      "Analyze business data and create reports and dashboards.",
    posted: "1 day ago"
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "CreativeWorks",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹5 - ₹8 LPA",
    experience: "1-3 Years",
    category: "Design",
    skills: ["Figma", "UI Design", "UX Research"],
    description:
      "Design clean and user-friendly digital experiences.",
    posted: "5 days ago"
  },
  {
    id: 5,
    title: "Java Developer",
    company: "CodeMatrix",
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹5 - ₹9 LPA",
    experience: "1-3 Years",
    category: "Development",
    skills: ["Java", "Spring Boot", "SQL"],
    description:
      "Develop scalable backend services using Java and Spring Boot.",
    posted: "4 days ago"
  },
  {
    id: 6,
    title: "Cyber Security Intern",
    company: "SecureNet",
    location: "Pune",
    type: "Internship",
    salary: "₹12,000/month",
    experience: "Fresher",
    category: "Security",
    skills: ["Networking", "Linux", "Security"],
    description:
      "Assist with security monitoring and vulnerability analysis.",
    posted: "6 days ago"
  }
];

function App() {
  const [page, setPage] = useState("home");
  const [jobs, setJobs] = useState(starterJobs);
  const [selectedJob, setSelectedJob] = useState(null);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const [category, setCategory] = useState("All");

  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [resume, setResume] = useState(null);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full Time",
    salary: "",
    experience: "",
    category: "Development",
    description: ""
  });

  const filteredJobs = jobs.filter((job) => {
    const text =
      `${job.title} ${job.company} ${job.skills.join(" ")}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesLocation =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchesType =
      jobType === "All" || job.type === jobType;

    const matchesCategory =
      category === "All" || job.category === category;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesCategory
    );
  });

  function openJob(job) {
    setSelectedJob(job);
    setPage("details");
  }

  function toggleSave(jobId) {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  }

  function applyJob(job) {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!resume) {
      alert("Please upload your resume from Candidate Dashboard.");
      setPage("candidate");
      return;
    }

    if (applications.some((app) => app.jobId === job.id)) {
      alert("You have already applied for this job.");
      return;
    }

    setApplications([
      ...applications,
      {
        jobId: job.id,
        title: job.title,
        company: job.company,
        status: "Applied",
        resume: resume.name
      }
    ]);

    alert("Application submitted successfully.");
  }

  function handleLogin(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please enter email and password.");
      return;
    }

    setUser({
      name: loginData.name || "Candidate",
      email: loginData.email
    });

    setShowLogin(false);

    setLoginData({
      name: "",
      email: "",
      password: ""
    });

    alert(registerMode ? "Account created successfully." : "Login successful.");
  }

  function logout() {
    setUser(null);
    setPage("home");
  }

  function postJob(e) {
    e.preventDefault();

    if (
      !newJob.title ||
      !newJob.company ||
      !newJob.location ||
      !newJob.salary ||
      !newJob.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const job = {
      ...newJob,
      id: Date.now(),
      skills: ["Communication", "Problem Solving"],
      posted: "Just now"
    };

    setJobs([job, ...jobs]);

    setNewJob({
      title: "",
      company: "",
      location: "",
      type: "Full Time",
      salary: "",
      experience: "",
      category: "Development",
      description: ""
    });

    alert("Job posted successfully.");
    setPage("jobs");
  }

  function clearFilters() {
    setSearch("");
    setLocation("");
    setJobType("All");
    setCategory("All");
  }

  function goJobs() {
    setPage("jobs");
  }

  return (
    <div className="app">

      <header className="navbar">
        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          JobBoard
        </div>

        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("jobs")}>Jobs</button>
          <button onClick={() => setPage("saved")}>Saved Jobs</button>
          <button onClick={() => setPage("candidate")}>
            Candidate
          </button>
          <button onClick={() => setPage("employer")}>
            Employer
          </button>

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button
              className="login-button"
              onClick={() => {
                setRegisterMode(false);
                setShowLogin(true);
              }}
            >
              Login
            </button>
          )}
        </nav>
      </header>

      {user && (
        <div className="account-bar">
          Welcome, <strong>{user.name}</strong>
        </div>
      )}

      {page === "home" && (
        <main>

          <section className="hero">
            <div className="hero-content">
              <p className="hero-label">PROFESSIONAL JOB PORTAL</p>

              <h1>
                Find a job that
                <span> fits your future.</span>
              </h1>

              <p className="hero-text">
                Discover opportunities from growing companies,
                apply with your resume and manage your career in one place.
              </p>

              <div className="hero-search">
                <input
                  placeholder="Job title, skill or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <button onClick={goJobs}>
                  Search Jobs
                </button>
              </div>

              <div className="popular">
                <span>Popular:</span>
                <button
                  onClick={() => {
                    setSearch("React");
                    setPage("jobs");
                  }}
                >
                  React
                </button>

                <button
                  onClick={() => {
                    setSearch("Python");
                    setPage("jobs");
                  }}
                >
                  Python
                </button>

                <button
                  onClick={() => {
                    setSearch("Data");
                    setPage("jobs");
                  }}
                >
                  Data
                </button>
              </div>
            </div>
          </section>

          <section className="stats">
            <div>
              <strong>500+</strong>
              <span>Jobs Available</span>
            </div>

            <div>
              <strong>120+</strong>
              <span>Companies</span>
            </div>

            <div>
              <strong>2,000+</strong>
              <span>Candidates</span>
            </div>

            <div>
              <strong>95%</strong>
              <span>Profile Completion</span>
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <div>
                <p>EXPLORE OPPORTUNITIES</p>
                <h2>Featured Jobs</h2>
              </div>

              <button onClick={goJobs}>
                View All Jobs
              </button>
            </div>

            <div className="job-grid">
              {jobs.slice(0, 3).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  savedJobs={savedJobs}
                  toggleSave={toggleSave}
                  openJob={openJob}
                  applyJob={applyJob}
                />
              ))}
            </div>
          </section>

          <section className="career-section">
            <div>
              <p className="hero-label">CAREER MANAGEMENT</p>
              <h2>Everything you need for your job search.</h2>
              <p>
                Search opportunities, save interesting jobs,
                upload your resume and track applications.
              </p>

              <button onClick={() => setPage("candidate")}>
                Open Candidate Dashboard
              </button>
            </div>

            <div className="career-box">
              <h3>Application Tracker</h3>

              <div className="tracker-row">
                <span>Applied</span>
                <strong>{applications.length}</strong>
              </div>

              <div className="tracker-row">
                <span>Saved Jobs</span>
                <strong>{savedJobs.length}</strong>
              </div>

              <div className="tracker-row">
                <span>Available Jobs</span>
                <strong>{jobs.length}</strong>
              </div>
            </div>
          </section>

        </main>
      )}

      {page === "jobs" && (
        <main className="page-container">

          <div className="page-title">
            <div>
              <p className="hero-label">OPPORTUNITIES</p>
              <h2>Find Your Next Job</h2>
            </div>

            <span>
              {filteredJobs.length} jobs found
            </span>
          </div>

          <div className="filter-panel">

            <input
              placeholder="Search by title, skill or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="All">All Job Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Development">Development</option>
              <option value="Data">Data</option>
              <option value="Design">Design</option>
              <option value="Security">Security</option>
            </select>

            <button onClick={clearFilters}>
              Clear
            </button>

          </div>

          <div className="job-grid">

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  savedJobs={savedJobs}
                  toggleSave={toggleSave}
                  openJob={openJob}
                  applyJob={applyJob}
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No jobs found</h3>
                <p>Try changing your search or filters.</p>
                <button onClick={clearFilters}>
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </main>
      )}

      {page === "details" && selectedJob && (
        <main className="page-container">

          <button
            className="back-button"
            onClick={goJobs}
          >
            Back to Jobs
          </button>

          <section className="details-layout">

            <div className="details-main">

              <div className="details-header">
                <div>
                  <p className="company-name">
                    {selectedJob.company}
                  </p>

                  <h1>{selectedJob.title}</h1>

                  <p>
                    {selectedJob.location} · {selectedJob.type} ·{" "}
                    {selectedJob.experience}
                  </p>
                </div>

                <button
                  onClick={() => toggleSave(selectedJob.id)}
                >
                  {savedJobs.includes(selectedJob.id)
                    ? "Saved"
                    : "Save Job"}
                </button>
              </div>

              <div className="details-card">
                <h3>Job Description</h3>

                <p>{selectedJob.description}</p>

                <h3>Required Skills</h3>

                <div className="skill-list">
                  {selectedJob.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <h3>Job Information</h3>

                <div className="info-grid">
                  <div>
                    <small>Salary</small>
                    <strong>{selectedJob.salary}</strong>
                  </div>

                  <div>
                    <small>Experience</small>
                    <strong>{selectedJob.experience}</strong>
                  </div>

                  <div>
                    <small>Job Type</small>
                    <strong>{selectedJob.type}</strong>
                  </div>

                  <div>
                    <small>Category</small>
                    <strong>{selectedJob.category}</strong>
                  </div>
                </div>

              </div>

            </div>

            <aside className="apply-card">

              <h3>Apply for this job</h3>

              <p>
                Submit your application with your latest resume.
              </p>

              <button
                className="apply-large"
                onClick={() => applyJob(selectedJob)}
              >
                Apply Now
              </button>

              <button
                className="secondary-button"
                onClick={() => toggleSave(selectedJob.id)}
              >
                {savedJobs.includes(selectedJob.id)
                  ? "Remove from Saved"
                  : "Save Job"}
              </button>

            </aside>

          </section>

        </main>
      )}

      {page === "saved" && (
        <main className="page-container">

          <div className="page-title">
            <div>
              <p className="hero-label">YOUR COLLECTION</p>
              <h2>Saved Jobs</h2>
            </div>

            <span>{savedJobs.length} saved</span>
          </div>

          {savedJobs.length === 0 ? (
            <div className="empty-state">
              <h3>No saved jobs</h3>
              <p>Save jobs that you want to apply for later.</p>
              <button onClick={goJobs}>
                Explore Jobs
              </button>
            </div>
          ) : (
            <div className="job-grid">
              {jobs
                .filter((job) => savedJobs.includes(job.id))
                .map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedJobs={savedJobs}
                    toggleSave={toggleSave}
                    openJob={openJob}
                    applyJob={applyJob}
                  />
                ))}
            </div>
          )}

        </main>
      )}

      {page === "candidate" && (
        <main className="page-container">

          <div className="dashboard-heading">
            <div>
              <p className="hero-label">CANDIDATE PORTAL</p>
              <h2>Candidate Dashboard</h2>
            </div>

            <button onClick={goJobs}>
              Find Jobs
            </button>
          </div>

          <div className="dashboard-grid">

            <div className="profile-card">

              <div className="profile-avatar">
                {user ? user.name.charAt(0).toUpperCase() : "C"}
              </div>

              <h3>
                {user ? user.name : "Candidate"}
              </h3>

              <p>
                {user
                  ? user.email
                  : "Login to manage your profile"}
              </p>

              {!user && (
                <button onClick={() => setShowLogin(true)}>
                  Login
                </button>
              )}

            </div>

            <div className="dashboard-card">

              <h3>Resume</h3>

              <p>
                Upload your latest resume before applying.
              </p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setResume(e.target.files[0])
                }
              />

              {resume && (
                <div className="file-status">
                  Resume selected: {resume.name}
                </div>
              )}

            </div>

            <div className="dashboard-card">

              <h3>Application Overview</h3>

              <div className="overview-number">
                {applications.length}
              </div>

              <p>Total Applications</p>

            </div>

          </div>

          <section className="dashboard-card applications-card">

            <div className="section-heading">
              <div>
                <p>APPLICATION MANAGEMENT</p>
                <h3>My Applications</h3>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="empty-small">
                <p>You have not applied to any jobs yet.</p>
                <button onClick={goJobs}>
                  Browse Jobs
                </button>
              </div>
            ) : (
              applications.map((application) => (
                <div
                  className="application-row"
                  key={application.jobId}
                >
                  <div>
                    <h4>{application.title}</h4>
                    <p>{application.company}</p>
                    <small>
                      Resume: {application.resume}
                    </small>
                  </div>

                  <span className="status">
                    {application.status}
                  </span>
                </div>
              ))
            )}

          </section>

        </main>
      )}

      {page === "employer" && (
        <main className="page-container">

          <div className="dashboard-heading">
            <div>
              <p className="hero-label">EMPLOYER PORTAL</p>
              <h2>Employer Dashboard</h2>
            </div>

            <span>{jobs.length} total jobs</span>
          </div>

          <div className="employer-stats">

            <div>
              <strong>{jobs.length}</strong>
              <span>Jobs Posted</span>
            </div>

            <div>
              <strong>{applications.length}</strong>
              <span>Applications</span>
            </div>

            <div>
              <strong>{savedJobs.length}</strong>
              <span>Saved Jobs</span>
            </div>

          </div>

          <section className="form-card">

            <div className="section-heading">
              <div>
                <p>EMPLOYER TOOLS</p>
                <h3>Post a New Job</h3>
              </div>
            </div>

            <form onSubmit={postJob}>

              <div className="form-grid">

                <input
                  placeholder="Job Title *"
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      title: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Company *"
                  value={newJob.company}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      company: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Location *"
                  value={newJob.location}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      location: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Salary *"
                  value={newJob.salary}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      salary: e.target.value
                    })
                  }
                />

                <select
                  value={newJob.type}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      type: e.target.value
                    })
                  }
                >
                  <option>Full Time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>

                <select
                  value={newJob.category}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      category: e.target.value
                    })
                  }
                >
                  <option>Development</option>
                  <option>Data</option>
                  <option>Design</option>
                  <option>Security</option>
                </select>

                <input
                  placeholder="Experience"
                  value={newJob.experience}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      experience: e.target.value
                    })
                  }
                />

              </div>

              <textarea
                placeholder="Job Description *"
                value={newJob.description}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    description: e.target.value
                  })
                }
              />

              <button type="submit">
                Publish Job
              </button>

            </form>

          </section>

        </main>
      )}

      {showLogin && (
        <div className="modal">

          <div className="login-modal">

            <button
              className="modal-close"
              onClick={() => setShowLogin(false)}
            >
              X
            </button>

            <p className="hero-label">
              JOBBOARD ACCOUNT
            </p>

            <h2>
              {registerMode
                ? "Create your account"
                : "Welcome back"}
            </h2>

            <p className="modal-text">
              {registerMode
                ? "Create an account to apply and track jobs."
                : "Login to manage your applications."}
            </p>

            <form onSubmit={handleLogin}>

              {registerMode && (
                <input
                  placeholder="Full Name"
                  value={loginData.name}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      name: e.target.value
                    })
                  }
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value
                  })
                }
              />

              <button type="submit">
                {registerMode ? "Create Account" : "Login"}
              </button>

            </form>

            <p
              className="switch-login"
              onClick={() => setRegisterMode(!registerMode)}
            >
              {registerMode
                ? "Already have an account? Login"
                : "New to JobBoard? Create an account"}
            </p>

          </div>

        </div>
      )}

      <footer>
        <div>
          <h3>JobBoard</h3>
          <p>
            A modern job search and career management platform.
          </p>
        </div>

        <div>
          <p>Job Search</p>
          <p>Career Management</p>
          <p>Employer Tools</p>
        </div>

        <div>
          <p>© 2026 JobBoard</p>
          <p>Web Development Internship</p>
        </div>
      </footer>

    </div>
  );
}

function JobCard({
  job,
  savedJobs,
  toggleSave,
  openJob,
  applyJob
}) {
  return (
    <article className="job-card">

      <div className="job-card-top">

        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <button
          className="save-button"
          onClick={() => toggleSave(job.id)}
        >
          {savedJobs.includes(job.id) ? "Saved" : "Save"}
        </button>

      </div>

      <p className="job-company">
        {job.company}
      </p>

      <h3>{job.title}</h3>

      <div className="job-meta">
        <span>{job.location}</span>
        <span>{job.type}</span>
        <span>{job.experience}</span>
      </div>

      <p className="job-salary">
        {job.salary}
      </p>

      <div className="skill-list">
        {job.skills.slice(0, 3).map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="job-footer">
        <small>{job.posted}</small>

        <div>
          <button onClick={() => openJob(job)}>
            Details
          </button>

          <button onClick={() => applyJob(job)}>
            Apply
          </button>
        </div>
      </div>

    </article>
  );
}

export default App;