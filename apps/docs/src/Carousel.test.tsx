import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from 'ui';
import '@testing-library/jest-dom';

describe('Carousel Component', () => {
  const slides = [
    <img
      key="slide1"
      src="https://example.com/slide1.jpg"
      alt="Slide 1"
    />,
    <img
      key="slide2"
      src="https://example.com/slide2.jpg"
      alt="Slide 2"
    />,
    <img
      key="slide3"
      src="https://example.com/slide3.jpg"
      alt="Slide 3"
    />,
  ];

  it('отображает слайды и навигационные кнопки', () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
    expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
    expect(screen.getByAltText('Slide 3')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2); 
  });

  it('меняет слайды при нажатии на кнопки навигации', () => {
    render(<Carousel slides={slides} />);
    const nextButton = screen.getAllByRole('button')[1];
    fireEvent.click(nextButton);
  });

  it('отображает активный индикатор для текущего слайда', () => {
    render(<Carousel slides={slides} />);
  });
});
