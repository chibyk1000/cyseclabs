import React, { useEffect, useRef, useContext } from "react";
//import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import logo from "../../assets/img/cysecnewlogo.png";
import video from "../../assets/img/intro.mp4";
import img1 from "../../assets/img/Group 37.png";
import img2 from "../../assets/img/Group 38.png";
import img3 from "../../assets/img/Group 39.png";
import img4 from "../../assets/img/services.jpg";
import img5 from "../../assets/img/technolo.jpg";
import img6 from "../../assets/img/quote.png";
import img7 from "../../assets/img/usersusers.svg";
import twitter from "../../assets/img/twitter.png";
import instagram from "../../assets/img/instagram.png";
import facebook from "../../assets/img/facebook.png";
import linkedin from "../../assets/img/linkedin.png";
import GlobalContext from "../../context/GlobalContext";
import "./Home.css";

function Home() {
  const videoEl = useRef(null);
  const { newsletter, newletterMessage } = useContext(GlobalContext);
  const newsletterRef = useRef("");

  const { checkUser } = useContext(GlobalContext);

  const handleNewsletter = (e) => {
    e.preventDefault();
    const data = newsletterRef.current.value;
    newsletter(data);
  };

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="hero-bg">
          <div className="hero">
            <div className="hero-text">
              <h2>
                <span style={{ color: "rgba(24, 225, 160, 1)" }}>Next</span>{" "}
                Generation <br /> Cyber
                <span style={{ color: "rgba(24, 225, 160, 1)" }}>
                  security
                </span>{" "}
                Professionals
              </h2>
              <p>
                Maintaining cybersecurity in a constantly evolving threat
                landscape is a challenge for all organization. Train your teams
                on this hacking labs
              </p>
              <button className="btn btn-a hvr-grow-shadow" onClick={() => checkUser()}>Get Started</button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn hvr-sweep-to-right">Learn More</button>
            </div>
            <div className="hero-img">
              {/* <video autoplay loop muted>
                <source src={video} type="video/mp4" />
              </video> */}
              <video
                playsInline
                loop
                muted
                controls
                alt="All the devices"
                src={video}
                ref={videoEl}
              />
            </div>
          </div>
        </div>
        <div className="guide">
          <div className="header-title-small">
            <h5>
              <span style={{ color: "rgba(24, 225, 160, 1)" }}>Key</span>{" "}
              Features
            </h5>
            <p>SECURE YOUR CYBER SPACE SECURE YOUR DIGITAL LIFE</p>
            <div className="space-divider" style={{ margin: "auto" }}></div>
          </div>
          <div className="features">
            <div className="feature-item">
              <img src={img1} alt="features" />
              <h4>Learn</h4>
              <p>
                At CHL, we give you the opportunity to learn new and revelant
                topics, tools and methodologies in cyber security.
              </p>
            </div>
            <div className="feature-item">
              {" "}
              <img src={img2} alt="features" />
              <h4>Hands-on Experience</h4>
              <p>
                Whether you are a beginner, intermediate or expert, we have
                something for you to practice on.
              </p>
            </div>
            <div className="feature-item">
              {" "}
              <img src={img3} alt="features" />
              <h4>Compete</h4>
              <p>
                Do you think you are better than the rest? Compete and find your
                way up the leaderboard.
              </p>
            </div>
          </div>
        </div>
        <div className="about-us">
          <div className="header-title">
            <h3>
              <span style={{ color: "#5cf5c4" }}>About </span>Us
            </h3>
            <p>SECURE YOUR CYBER SPACE SECURE YOUR DIGITAL LIFE</p>
            <div className="space-divider"></div>
          </div>
          <div className="about">
            <div className="about-text">
              <p>
                A platform for you to learn various areas of cyber security. Red
                Team? Blue Team? Purple Team? We got you all covered.
              </p>
              <p>
                With over 10,000 participants across Africa, the platform has
                grown to identified skilled and professional cybersecurity
                personnels. It’s good to belong. Especially when a community
                shares the same objectives, is massively growing, welcomes
                everybody, and is always ready to help by exchanging ideas and
                spreading the hacking knowledge. That’s the Hacking Lab!
              </p>
              <button className="btn btn-a hvr-grow-shadow">Learn More</button>
            </div>
            <div className="about-img">
              <img src={img4} alt="Cysec" />
            </div>
          </div>
        </div>
        <div className="lab-wrapper">
          <div className="header-title">
            <h3>
              <span style={{ color: "#5cf5c4" }}>Popular </span>Labs
            </h3>
            <p>SECURE YOUR CYBER SPACE SECURE YOUR DIGITAL LIFE</p>
            <div className="space-divider"></div>
          </div>
          <div className="owl-carousel owl-theme lab-container"></div>
        </div>

        <div className="quote">
          <div className="quote-bar">&nbsp;</div>
          <div className="quote-text">
            <h3>Largest National Hacking Community</h3>
            <p>
              It’s good to belong. Especially when a community shares the same
              objectives, is massively growing, welcomes everybody, and is
              always ready to help by exchanging ideas and spreading the hacking
              knowledge.
            </p>
            <button className="btn btn-c hvr-grow-shadow">JOIN NOW</button>
          </div>
          <div className="quote-img">
            <img src={img6} alt="quote-img" />
          </div>
        </div>
        <div className="contact-us">
          <div className="header-title">
            <h3 style={{ color: "#5cf5c4" }}>
              Get In <span style={{ color: "#fff" }}>Touch</span>
            </h3>
            <p>SECURE YOUR CYBER SPACE SECURE YOUR DIGITAL LIFE</p>
            <div className="space-divider"></div>
          </div>
          <div className="contact-section">
            <div className="contact-form">
              <form action="#" method="get">
                <div className="form-group">
                  <input
                    placeholder="Enter Your Name"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    id="subject"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    style={{ height: "60px" }}
                    placeholder="Type your message"
                  ></textarea>
                </div>
                <button className="btn hvr-sweep-to-right">Send Message</button>
              </form>
            </div>
            <div className="contact-map">
              <img src={img5} alt="" />
            </div>
          </div>
        </div>
        <div className="newsletter">
          <h2>
            Join <span style={{ color: "#5cf5c4" }}>Our</span> Large{" "}
            <span style={{ color: "#5cf5c4" }}>Community</span>{" "}
          </h2>
          <p>
            Subcribe to get the latest updates about our <br /> products &
            features
          </p>
          <form onSubmit={handleNewsletter}>
            <input type="email" placeholder="Email" ref={newsletterRef} />
            <button>JOIN</button>
          </form>
          {newletterMessage && (
            <div className="newletterMessage">{newletterMessage}</div>
          )}
          <img src={img7} alt="" />
        </div>
      </main>
      <footer>
        <div className="footer-home">
          <img className="logo" src={logo} alt="logo" />
          <p>
            A platform for you to learn various areas of cyber security. Red
            Team? Blue Team? Purple Team? We got you all covered!
          </p>
          <hr />
          <div className="footer-social">
            <h3>Follow Us</h3>
            <a href="https://facebook.com">
              <li>
                <img src={facebook} alt="facebook" />{" "}
              </li>
            </a>
            <a href="https://instagram.com">
              <li>
                <img src={instagram} alt="instagram" />
              </li>
            </a>
            <a href="https://twitter.com">
              <li>
                <img src={twitter} alt="twitter" />
              </li>
            </a>
            <a href="https://linkedin.com">
              <li>
                <img src={linkedin} alt="linkedin" />
              </li>
            </a>
          </div>
        </div>
        <div className="useful-links">
          <h4>Useful Links</h4>
          <ul>
            <li>Home</li>
            <li>Learn & Practice</li>
            <li>Leaderboard</li>
          </ul>
        </div>
        {/* <div className="contact">
          <h4>Contact</h4>
          <ul>
            <li>+234 706 214 6978</li>
            <li>+234 703 377 4429</li>
            <li>info@cybersecuritychallenge.com.ng </li>
            <li>info@cysec.ng</li>
          </ul>
        </div> */}
      </footer>

      <div className="copyright">
        <p>© Copyright HACKING LAB | All Rights Reserved</p>
      </div>
    </>
  );
}

export default Home;
