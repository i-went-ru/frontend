import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardResident } from 'ui';

describe('CardResident Component', () => {
  const name = "Биотехнологии";
  const image = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60";
  const labels = ["exposkils", "rum", "Моя профессия IT", "altan school"];

  it('отображает имя и изображение', () => {
    render(<CardResident name={name} image={image} labels={labels} />);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
  });

  it('отображает все переданные метки', () => {
    render(<CardResident name={name} image={image} labels={labels} />);
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

});
