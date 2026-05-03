import './homepage.css'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Card, Badge, Col, Row } from "react-bootstrap";

export default function HomePage() {
   return(
    <>
    {/* <!-- ═══ NAVBAR ════ --> */}
<nav class="navbar navbar-expand-lg sf-nav">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2" href="#">
      <div class="brand-box"><i class="bi bi-geo-alt-fill"></i></div>
      <div>
        <span class="brand-name">SAFORA</span>
        <span class="brand-tag">Travel Safe, Travel Smart</span>
      </div>
    </a>
    <button class="navbar-toggler text-white border " data-bs-toggle="collapse"
    data-bs-target="#sfNav">
    <i class="bi bi-menu-button-wide"></i>
    </button>
     <div class="collapse navbar-collapse" id="sfNav">
     <div class="navbar-nav">
     <a href="" class="nav-link text-white active">Home</a>
     <a href="" class="nav-link text-white">Features</a>
     <a href="" class="nav-link text-white">Reports</a>
    <a href="" class="nav-link text-white">Map</a>
     <a href="" class="nav-link text-white">Community</a>
    <a href="" class="nav-link text-white">About us</a>
    </div>
    </div>
      <div class="d-flex gap-3 mt-5 ">
        <button class="btn btn-login mt-2">Login</button>
        <button class="btn btn-signup">Sign Up</button>
      </div>
    </div>
</nav>
 
{/* <!-- ═════════ HERO ════════════ --> */}
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-ov"></div>
 
  <div class="hero-body">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-xl-6">
          <div class="badge-pill fu">
            <i class="bi bi-globe2"></i> Crowdsourced Travel Safety Platform
          </div>
          <h1 class="hero-h1 fu fu1">
            Travel with Confidence.
            Stay Safe with <span class="hl">Safora.</span>
          </h1>
          <p class="hero-sub fu fu2">
            Real-time travel safety information shared by travelers like you to help
            everyone make smarter and safer travel decisions.
          </p>
          <div class="d-flex flex-wrap gap-3 fu fu3">
            <a href="#" class="btn-hp"><i class="bi bi-flag-fill"></i> Report an Issue</a>
            <a href="#" class="btn-hs"><i class="bi bi-map-fill"></i> View Live Map</a>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  <div class="pills-bar">
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-3 text-center"><div class="pill-item"><i class="bi bi-bell-fill"></i> Real-time Alerts</div></div>
        <div class="col-6 col-md-3 text-center"><div class="pill-item"><i class="bi bi-people-fill"></i> Community Driven</div></div>
        <div class="col-6 col-md-3 text-center"><div class="pill-item"><i class="bi bi-diagram-3-fill"></i> Smart Routing</div></div>
        <div class="col-6 col-md-3 text-center"><div class="pill-item"><i class="bi bi-shield-check-fill"></i> Travel Safe</div></div>
      </div>
    </div>
  </div>
</section>

{/* <!-- ══════ FOOTER ════════ --> */}
{/* <footer class="sf-footer">
  <div class="container">
    <div class="row py-5 g-4">
      <div class="col-12 col-md-4 col-lg-3">
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="brand-box"><i class="bi bi-geo-alt-fill"></i></div>
          <div>
            <span class="brand-name">SAFORA</span>
            <span class="brand-tag">Travel Safe, Travel Smart</span>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-2">
        <div class="ftr-heading">Quick Links</div>
        <a href="#" class="ftr-link">Home</a>
        <a href="#" class="ftr-link">Features</a>
        <a href="#" class="ftr-link">Reports</a>
        <a href="#" class="ftr-link">Map</a>
        <a href="#" class="ftr-link">Community</a>
      </div>
      <div class="col-6 col-md-3">
        <div class="ftr-heading">Resources</div>
        <a href="#" class="ftr-link">About Us</a>
        <a href="#" class="ftr-link">Privacy Policy</a>
        <a href="#" class="ftr-link">Terms &amp; Conditions</a>
        <a href="#" class="ftr-link">Help &amp; Support</a>
        <a href="#" class="ftr-link">Contact Us</a>
      </div>
      <div class="col-12 col-md-3">
        <div class="ftr-heading">Stay Connected</div>
        <p style="font-size:.85rem;line-height:1.6;margin-bottom:1rem">
          Join our community and travel safer with real-time updates.
        </p>
        <div class="d-flex gap-2">
          <a href="#" class="soc-btn"><i class="bi bi-facebook"></i></a>
          <a href="#" class="soc-btn"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="soc-btn"><i class="bi bi-instagram"></i></a>
          <a href="#" class="soc-btn"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>
    <hr class="ftr-hr" />
    <div class="py-3 text-center ftr-copy">© 2024 Safora. All rights reserved.</div>
  </div>
</footer> */}
    </>
   )
}