import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from 'ui/src/Button.stories';
import '@testing-library/jest-dom';

const { Default, Secondary, Disabled } = composeStories(stories);
describe('Button Component', () => {
  it('отображает дефолтную кнопку', () => {
    render(<Default />);
    const buttonElement = screen.getByRole('button', { name: 'Button' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-primary text-white');
  });
  

  it('отображает второстепенную кнопку', () => {
    render(<Secondary />);
    const buttonElement = screen.getByRole('button', { name: 'Button' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-secondary text-primary');
  });

  it('отображает отключенную кнопку', () => {
    render(<Disabled />);
    const buttonElement = screen.getByRole('button', { name: 'Button' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-disabled text-black');
    expect(buttonElement).toBeDisabled();
  });
});
