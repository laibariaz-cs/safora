import './homepage.css'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Card, Badge,  Col, Row } from "react-bootstrap";

export default function HomePage() {
    return(
        // <!-- HEADER / NAVBAR -->
   <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
  <div className="container">
    
    {/* <!-- Logo --> */}
    <a className="navbar-brand fw-bold" href="#">
      <span className="logo-icon">📍</span> SAFORA
    </a>

    {/* <!-- Toggle --> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* <!-- Menu --> */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li className="nav-item"><a class="nav-link" href="#">Features</a></li>
        <li className="nav-item"><a class="nav-link" href="#">Reports</a></li>
        <li className="nav-item"><a class="nav-link" href="#">Map</a></li>
        <li className="nav-item"><a class="nav-link" href="#">Community</a></li>
        <li className="nav-item"><a class="nav-link" href="#">About Us</a></li>
      </ul>

      {/* <!-- Buttons --> */}
      <div className="d-flex gap-2">
        <button className="btn btn-outline-light px-4">Login</button>
        <button className="btn btn-primary px-4">Sign Up</button>
      </div>
    </div>
  </div>
</nav>
    )
}