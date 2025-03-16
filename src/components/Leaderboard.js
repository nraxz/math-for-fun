import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
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
          <h1 className="display-4 text-center mb-5 text-success">Leaderboard</h1>
          
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="p-5">
              <div className="mb-4">
                <i className="fas fa-cogs text-success display-1"></i>
              </div>
              <h2 className="mb-4">Coming Soon!</h2>
              <p className="lead mb-4">
                We're currently working on user scoring functionalities.
              </p>
              <p className="mb-4">
                Soon you'll be able to save your scores, compete with friends, and track your progress.
                Check back in the near future to see how you compare with other players!
              </p>
              <div className="d-flex justify-content-center">
                <Link to="/" className="btn btn-success btn-lg px-4">
                  <i className="fas fa-gamepad me-2"></i>
                  Keep Playing Games
                </Link>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
      
      <footer className="py-3 bg-dark text-center text-light mt-5">
        <p className="mb-0">© Copyright Nareshshahi.com</p>
      </footer>
    </div>
  );
};

export default Leaderboard; 