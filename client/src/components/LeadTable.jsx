import { useState } from "react";
import api from "../api";

const LeadTable = ({ leads, setLeads }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Update lead status
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      const response = await api.patch(
        `/leads/${id}`,
        { status }
      );

      const updatedLead = response.data.lead;

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === id
            ? updatedLead
            : lead
        )
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update lead status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete lead
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      await api.delete(`/leads/${id}`);

      setLeads((prevLeads) =>
        prevLeads.filter(
          (lead) => lead._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete lead error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete lead"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="table-wrapper">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Budget</th>
            <th>Message</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>

              <td>{lead.email}</td>

              <td>{lead.budget}</td>

              <td className="message-cell">
                {lead.message}
              </td>

              <td>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    handleStatusChange(
                      lead._id,
                      e.target.value
                    )
                  }
                  disabled={
                    updatingId === lead._id
                  }
                >
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
              </td>

              <td>
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>

              <td>
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(lead._id)
                  }
                  disabled={
                    deletingId === lead._id
                  }
                >
                  {deletingId === lead._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;