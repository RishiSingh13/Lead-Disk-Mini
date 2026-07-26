import Footer from "../components/Footer";
import LeadForm from "../components/LeadForm";

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <nav className="navbar">
          <h2>LeadDesk</h2>

          <a href="/login">
            Admin Login
          </a>
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