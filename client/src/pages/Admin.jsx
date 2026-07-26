import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";
import LeadTable from "../components/LeadTable";

const Admin = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch all leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/leads");

      setLeads(response.data.leads);
    } catch (error) {
      console.error("Fetch leads error:", error);

      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Failed to fetch leads."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login");
    }
  };

  // Summary counts
  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  // Search and filter
  const filteredLeads = leads.filter((lead) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      lead.name.toLowerCase().includes(searchValue) ||
      lead.email.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>LeadDesk Admin</h1>

          <p>Manage your leads</p>
        </div>

        <div className="admin-actions">
          <button
            onClick={() => navigate("/")}
          >
            View Website
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="admin-content">
        {/* Dashboard Heading */}
        <div className="dashboard-header">
          <div>
            <h2>Lead Management</h2>

            <p>
              View and manage all submitted leads.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <span>Total Leads</span>
            <strong>{totalLeads}</strong>
          </div>

          <div className="summary-card">
            <span>New</span>
            <strong>{newLeads}</strong>
          </div>

          <div className="summary-card">
            <span>Contacted</span>
            <strong>{contactedLeads}</strong>
          </div>

          <div className="summary-card">
            <span>Qualified</span>
            <strong>{qualifiedLeads}</strong>
          </div>

          <div className="summary-card">
            <span>Closed</span>
            <strong>{closedLeads}</strong>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="lead-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Statuses
              </option>

              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Qualified">
                Qualified
              </option>

              <option value="Closed">
                Closed
              </option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading">
            Loading leads...
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Empty database */}
        {!loading &&
          !error &&
          leads.length === 0 && (
            <div className="empty-state">
              <h3>No leads yet</h3>

              <p>
                When someone submits the lead form,
                it will appear here.
              </p>
            </div>
          )}

        {/* No search results */}
        {!loading &&
          !error &&
          leads.length > 0 &&
          filteredLeads.length === 0 && (
            <div className="empty-state">
              <h3>No matching leads</h3>

              <p>
                Try changing your search or filter.
              </p>
            </div>
          )}

        {/* Lead Table */}
        {!loading &&
          !error &&
          filteredLeads.length > 0 && (
            <>
              <div className="results-info">
                Showing {filteredLeads.length} of{" "}
                {totalLeads} leads
              </div>

              <LeadTable
                leads={filteredLeads}
                setLeads={setLeads}
              />
            </>
          )}
      </main>
    </div>
  );
};

export default Admin;