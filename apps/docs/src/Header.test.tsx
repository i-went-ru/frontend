import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { Button, Header } from 'ui';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  const links = [
    { name: 'Предстоящие экскурсии', href: '#' },
    { name: 'Резиденты', href: '#' },
    { name: 'Обратная связь', href: '#' },
  ];

  it('отображает все ссылки', () => {
    render(
      <Header links={links}/>
    );

    links.forEach(link => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });
  });

  it('отображает дочерние компоненты', () => {
    render(
      <Header links={links}>
        <Button children="Вход" variant="secondary" />
        <Button children="Регистрация" variant="default" />
      </Header>
    );

    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });

  it('отображает пользовательский икон в варианте Auth', () => {
    const { container } = render(
        <Header links={links}>
          <Button size="icon" children={<UserIcon className="h-6" />} />
        </Header>
      );
        

    const icon = container.querySelector('.h-6');
    expect(icon).toBeInTheDocument();
  });
});
