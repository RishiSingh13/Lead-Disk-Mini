import Footer from "../components/Footer";
import LeadForm from "../components/LeadForm";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <nav className="navbar">
          <h2>LeadDesk</h2>

          <Link to="/login">
            Admin Login
          </Link>
        </nav>

        <div className="hero-content">
          <h1>
            Turn Every Lead Into an Opportunity
          </h1>

          <p>
            Tell us about your project and our team
            will get back to you.
          </p>

          <a href="#lead-form">
            Get Started
          </a>
        </div>
      </header>

      <main id="lead-form">
        <LeadForm />
      </main>
       <Footer/>
    </div>
   
  );
};

export default Home;
