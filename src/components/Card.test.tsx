import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from "./Card";

describe('Card', () => {
  const defaultProps = {
    title: 'Test Metric',
    value: '1000',
    onHover: jest.fn(),
    onLeave: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with provided title and value', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('calls onHover when mouse enters', () => {
    render(<Card {...defaultProps} />);

    const card = screen.getByRole('region');
    fireEvent.mouseEnter(card);

    expect(defaultProps.onHover).toHaveBeenCalledTimes(1);
  });

  it('calls onLeave when mouse leaves', () => {
    render(<Card {...defaultProps} />);

    const card = screen.getByRole('region');
    fireEvent.mouseLeave(card);

    expect(defaultProps.onLeave).toHaveBeenCalledTimes(1);
  });

});