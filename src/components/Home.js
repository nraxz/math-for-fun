import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import SummationChallenge from '../components/SummationChallenge';
import ArithmeticChallenge from '../components/ArithmeticChallenge';
import TimesChallenge from '../components/TimesChallenge';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import BranchChallenge from './BranchChallenge';
import VisualMemory from './VisualMemory';
import NumberMemory from './NumberMemory';
import SmartChimpanzee from './SmartChimpanzee';

const Home = () => {
  const scnum1 = Math.floor(Math.random() * 10) + 1;
  const scnum2 = Math.floor(Math.random() * 10) + 1;
  const acnum1 = Math.floor(Math.random() * 12) + 1;
  const acnum2 = Math.floor(Math.random() * 12) + 1;
  const tcnum1 = Math.floor(Math.random() * 10) + 1;
  const tcnum2 = Math.floor(Math.random() * 10) + 1;
  const newSign = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
  return (
    <div className="game-container">
      <Helmet>
        <title>Math For Fun</title>
        <meta name="description" content="Engage in fun math challenges to help improving kids skills in simple mathematical operations and memory games" />
        <meta property="og:title" content="Math For Fun" />
        <meta property="og:description" content="Engage in fun math challenges to help improving kids skills in simple mathematical operations and memory games" />
        <meta property="og:image" content="https://nareshshahi.com/mathforfun.png" />
        <meta property="og:url" content="https://mathforfun.nareshshahi.com" />
        <meta name="twitter:card" content="math_for_fun" />
      </Helmet>

      <Navbar bg="primary" variant="dark" expand="lg" className="rounded-bottom shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fs-3">
            <i className="fas fa-calculator me-2"></i>
            Math For Fun
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="display-6 mb-4 text-primary">
            <i className="fas fa-star me-2"></i>
            Math Games
          </h2>
          <Row className="g-4">
            <Col xs={12} md={6} lg={4}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link to="/summation" className="text-decoration-none">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-warning text-dark">
                      <h5 className="mb-0">
                        <i className="fas fa-plus-circle me-2"></i>
                        Summation Challenge
                      </h5>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-3">
                        <h3 className="display-6 text-primary">{scnum1} + {scnum2} = ?</h3>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">
                        Practice addition with fun! Solve problems and earn points for each correct answer.
                      </Card.Text>
                      <button className="btn btn-success w-100">
                        <i className="fas fa-play me-2"></i>
                        Start Playing
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link to="/arithmetic" className="text-decoration-none">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-warning text-dark">
                      <h5 className="mb-0">
                        <i className="fas fa-minus-circle me-2"></i>
                        Arithmetic Sprint
                      </h5>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-3">
                        <h3 className="display-6 text-primary">{acnum1} {newSign} {acnum2} = ?</h3>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">
                        Enhance arithmetic skills with interactive problems.
                      </Card.Text>
                      <button className="btn btn-success w-100">
                        <i className="fas fa-play me-2"></i>
                        Start Playing
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link to="/times" className="text-decoration-none">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-warning text-dark">
                      <h5 className="mb-0">
                        <i className="fas fa-times-circle me-2"></i>
                        Times Sprint
                      </h5>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-3">
                        <h3 className="display-6 text-primary">{tcnum1} X {tcnum2} = ?</h3>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">
                        Improve multiplication proficiency in a stimulating way.
                      </Card.Text>
                      <button className="btn btn-success w-100">
                        <i className="fas fa-play me-2"></i>
                        Start Playing
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link to="/branch" className="text-decoration-none">
                  <Card className="mb-4">
                    <Card.Header className="bg-warning text-dark">
                      <strong>Branch Math</strong>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="text-muted flex-grow-1">
                        <div className="text-center">
                          <i className="fas fa-tree fs-1 text-success mb-3">Branch it</i>
                        </div>
                        Fill in the branches with numbers that add up to the target! A fun way to practice addition and strategic thinking.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <button type="button" className="btn btn-success w-100">
                        Play Now
                      </button>
                    </Card.Footer>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5"
        >
          <h2 className="display-6 mb-4 text-primary">
            <i className="fas fa-brain me-2"></i>
            Memory Games
          </h2>
          <Row className="g-4">
            <Col xs={12} md={6} lg={4}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link to="/visualmemory" className="text-decoration-none">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-warning text-dark">
                      <h5 className="mb-0">
                        <i className="fas fa-eye me-2"></i>
                        Visual Memory
                      </h5>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-3">
                        <h3 className="display-6 text-primary">Visual Memory</h3>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">
                        Follow and recall block patterns. Each level adds more blocks to memorize. How far can you go?
                      </Card.Text>
                      <button className="btn btn-success w-100">
                        <i className="fas fa-play me-2"></i>
                        Play Now
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link to="/memory" className="text-decoration-none">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-warning text-dark">
                      <h5 className="mb-0">
                        <i className="fas fa-memory me-2"></i>
                        Number Memory
                      </h5>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-3">
                        <h3 className="display-6 text-primary">Number Memory</h3>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">
                        Test and enhance your memory recall by memorizing and regenerating number sequences. Start with a basic sequence and progress to more challenging ones.
                      </Card.Text>
                      <button className="btn btn-success w-100">
                        <i className="fas fa-play me-2"></i>
                        Play Now
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link to="/smarter-chimpanzee" className="text-decoration-none">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-warning text-dark">
                      <h5 className="mb-0">
                        <i className="fas fa-paw me-2"></i>
                        Smart Chimpanzee
                      </h5>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-3">
                        <h3 className="display-6 text-primary">Smart Chimpanzee</h3>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">
                        As you progress, memorize and follow the sequence of numbers within blocks, with the challenge intensifying as the number of blocks increases upon each correct sequence recall.
                      </Card.Text>
                      <button className="btn btn-success w-100">
                        <i className="fas fa-play me-2"></i>
                        Play Now
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
            
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;
