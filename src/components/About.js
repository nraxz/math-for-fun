import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-success w-100 position-fixed top-0">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            <i className="fas fa-brain me-2"></i>
            Math For Fun
          </Link>
          <div className="ms-auto">
            <Link to="/" className="btn btn-outline-light btn-sm">
              <i className="fas fa-home me-1"></i> Home
            </Link>
          </div>
        </div>
      </nav>

      <Container className="py-5 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="display-4 text-center mb-5 text-success">About Math For Fun</h1>
          
          <Row className="mb-5">
            <Col md={12}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h2 className="text-success mb-4">A Dad's Gift to His Son</h2>
                  <p className="lead">
                    Math For Fun began as a personal project – a father's creative gift to his young son. 
                    The developer created these games to make learning mathematics an enjoyable journey rather than a daunting task.
                  </p>
                  <p>
                    What began as one game soon expanded into a collection, each designed to address specific aspects of mathematical understanding and cognitive development.
                    The developer observed how these games not only improved his son's mathematical abilities but also enhanced his focus, memory, and problem-solving skills.
                  </p>
                  <p>
                    Recognizing the potential benefit to other children, the developer decided to make these games freely available online, believing that quality educational resources should be accessible to everyone.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h3 className="text-success mb-3">
                    <i className="fas fa-brain me-2"></i>
                    Beyond Mathematics
                  </h3>
                  <p>
                    These challenges go far beyond simple mathematics. Each game is carefully designed to stimulate:
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <strong>Cognitive Development</strong> - Exercises that strengthen neural pathways
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <strong>Memory Enhancement</strong> - Games that improve both short and long-term memory
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <strong>Problem-Solving Skills</strong> - Challenges that foster creative thinking
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <strong>Focus and Attention</strong> - Tasks that require concentration and patience
                    </li>
                    <li>
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <strong>Speed and Accuracy</strong> - Activities that balance quick thinking with precision
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h3 className="text-success mb-3">
                    <i className="fas fa-lightbulb me-2"></i>
                    Free Yet Formidable
                  </h3>
                  <p>
                    While there are certainly more advanced educational platforms available on the market, many come with subscription fees or paywalls that limit access.
                  </p>
                  <p>
                    Math For Fun takes a different approach: completely free, yet cleverly designed. We believe that:
                  </p>
                  <ul>
                    <li className="mb-2">Educational resources should be accessible to all children, regardless of financial circumstances</li>
                    <li className="mb-2">Learning should be engaging, witty, and spark joy in young minds</li>
                    <li className="mb-2">Simple games can sometimes be more effective than complex, overwhelming platforms</li>
                    <li>The best educational tools are those that children actually want to use</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="text-success mb-3">
                    <i className="fas fa-code me-2"></i>
                    About Our Games
                  </h3>
                  <Row>
                    <Col md={6}>
                      <div className="mb-4">
                        <h5 className="text-primary">
                          <i className="fas fa-calculator me-2"></i>
                          Math Challenges
                        </h5>
                        <p>
                          All of our math games are original designs created by the developer. Each challenge is crafted to target specific mathematical concepts and skills, making them not just educational, but genuinely fun to play.
                        </p>
                        <p>
                          From simple addition in the Summation Challenge to the more complex Branch Math, each game introduces mathematical concepts in an intuitive, interactive way.
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <h5 className="text-primary">
                          <i className="fas fa-puzzle-piece me-2"></i>
                          Memory Games
                        </h5>
                        <p>
                          Our memory games draw inspiration from classic memory challenges that have proven effective over time. While the concepts may be familiar, we've reimagined them entirely in React, with significant UI/UX improvements.
                        </p>
                        <p>
                          The enhanced visuals, responsive design, and accessibility features make these classic challenges more engaging and effective than ever before.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
      
      <footer className="py-3 bg-dark text-center text-light mt-5">
        <p className="mb-0">© Copyright Nareshshahi.com</p>
      </footer>
    </div>
  );
};

export default About; 