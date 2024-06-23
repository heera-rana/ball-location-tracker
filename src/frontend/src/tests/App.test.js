import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import App from '../App';

test('renders In-Play Football text', () => {
  render(<App />);
  const linkElement = screen.getByText(/In-Play Football/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Pitch link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pitch/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Match Stats link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Match Stats/i);
  expect(linkElement).toBeInTheDocument();
});