import { useState } from "react";
import api from "../api";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.budget ||
      !formData.message
    ) {
      setError("Please fill in all fields.");
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/leads", formData);

      setSuccess(response.data.message);

      
      setFormData({
        name: "",
        email: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-container">
      <h2>Get in Touch</h2>

      <p>
        Tell us about your project and we'll get back to you.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Budget Range</label>

          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          >
            <option value="">Select your budget</option>
            <option value="Under $1,000">Under $1,000</option>
            <option value="$1,000 - $5,000">
              $1,000 - $5,000
            </option>
            <option value="$5,000 - $10,000">
              $5,000 - $10,000
            </option>
            <option value="Above $10,000">
              Above $10,000
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Message</label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project"
            rows="5"
          />
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {success && (
          <p className="success-message">
            {success}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Lead"}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;