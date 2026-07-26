const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} LeadDesk. All rights reserved.
      </p>
      <p>Built for Digital Heroes Training Task</p>
      <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">
        digitalheroesco.com
      </a>
    </footer>
  );
};

export default Footer;