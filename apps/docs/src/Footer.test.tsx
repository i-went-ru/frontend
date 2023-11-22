import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from 'ui';

describe('Footer Component', () => {
    it('рендерим футер с ссылками', () => {
      const links = [
        { name: 'Предстоящие экскурсии', href: '#' },
        { name: 'Резиденты', href: '#' },
        { name: 'Обратная связь', href: '#' },
      ];
  
      render(<Footer links={links} />);
  
      links.forEach(link => {
        expect(screen.getByText(link.name)).toBeInTheDocument();
      });
    });
  
    it('рендерим футер с информацией', () => {
      render(<Footer links={[]} />);
  
      expect(screen.getByText(/info@i-went.ru/)).toBeInTheDocument();
      expect(screen.getByText(/\+7 \(812\) 804-21-23/)).toBeInTheDocument();
    });
  });
  
