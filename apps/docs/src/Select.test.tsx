import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { Select } from 'ui';
import '@testing-library/jest-dom';


describe('Select Component', () => {
  const lists = [{ id: 0, value: "14:00" }, { id: 1, value: "15:00" }, { id: 2, value: "16:00" }];
  const mockOnChange = jest.fn();

  it('рендерит компонент и отображает заданное значение', () => {
    render(<Select lists={lists} label="Выберите время" onChangeSelect={mockOnChange} valueSelect={lists[0]} />);
    expect(screen.getByText("14:00")).toBeInTheDocument();
  });

  it('опции при клике', async () => {
    render(<Select lists={lists} label="Выберите время" onChangeSelect={mockOnChange} valueSelect={lists[0]} />);
    await act(async () => {
      fireEvent.click(screen.getByText("14:00"));
    });
    expect(screen.getByText("15:00")).toBeInTheDocument();
    expect(screen.getByText("16:00")).toBeInTheDocument();
  });

  it('вызывает onChange при выборе опции', async() => {
    render(<Select lists={lists} label="Выберите время" onChangeSelect={mockOnChange} valueSelect={lists[0]} />);
    await act(async () => {
      fireEvent.click(screen.getByText("14:00"));
    });
    await act(async () => {
      fireEvent.click(screen.getByText("15:00"));
    });
    expect(mockOnChange).toHaveBeenCalledWith(lists[1]);
  });

});
