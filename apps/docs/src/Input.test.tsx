import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeartIcon } from "@radix-ui/react-icons";
import { Input } from 'ui';
import '@testing-library/jest-dom';


describe('Input Component', () => {
  it('рендерит базовый вариант', () => {
    render(<Input label="Test" value="" onChange={() => {}} id="test"/> );
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });

  it('отображает сообщение об ошибке', () => {
    render(<Input id="test" label="Test" variant="error" errorMessage="ОШИБКА!!!" value="" onChange={() => {}} />);
    expect(screen.getByText('ОШИБКА!!!')).toBeInTheDocument();
  });

  it('отображает иконку слева', () => {
    render(<Input id="test" label="Test" variant="iconleft" icon={{ element: <HeartIcon className="h-full" data-testid="heart-icon"/>, position: "left" }} value="" onChange={() => {}} />);
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('отображает иконку справа', () => {
    render(<Input id="test" label="Test" variant="iconright" icon={{ element: <HeartIcon className="h-full" data-testid="heart-icon"/>, position: "right" }} value="" onChange={() => {}} />);
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('меняет тип поля ввода при нажатии на иконку глаза', () => {
    render(<Input id="test" label="Test" variant="iconright" password={true} value="" onChange={() => {}} />);
    const eyeIcon = screen.getByTestId('eye-icon');
    const input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.mouseDown(eyeIcon);
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.mouseUp(eyeIcon);
    expect(input).toHaveAttribute('type', 'password');
  });
});
