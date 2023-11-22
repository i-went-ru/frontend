import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cards } from 'ui';
import '@testing-library/jest-dom';


describe('Cards Component', () => {
  const label = "Технопарк в цифрах";
  const description = "Информация про ИТпарк";
  const stats = [
    { id: 0, name: "Резидентов", value: "159" },
    { id: 1, name: "Партнеров", value: ">100" },
    { id: 2, name: "Выручка резидентов", value: "2 млрд." },
    { id: 3, name: "Площадь технопарка", value: "20 816м2" },
  ];

  it('отображает заголовок и описание', () => {
    render(<Cards label={label} description={description} stats={stats} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('отображает правильное количество карточек статистики', () => {
    render(<Cards label={label} description={description} stats={stats} />);
    stats.forEach(stat => {
      expect(screen.getByText(stat.name)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    });
  });
});
