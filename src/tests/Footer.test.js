import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';
import App from '../App';

describe('Testando componente Footer', () => {
  beforeEach(() => {
    renderWithRouter(<Footer />);
  });

  test('Testa se possui o data-testid="footer"', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('Testa se possui o data-testid="drinks-bottom-btn"', () => {
    const drinks = screen.getByTestId('drinks-bottom-btn');
    expect(drinks).toBeInTheDocument();
  });

  test('Testa se possui o data-testid="explore-bottom-btn"', () => {
    const explore = screen.getByTestId('explore-bottom-btn');
    expect(explore).toBeInTheDocument();
  });

  test('Testa se possui o data-testid="food-bottom-btn"', () => {
    const food = screen.getByTestId('food-bottom-btn');
    expect(food).toBeInTheDocument();
  });
});

describe('Testa se possui footer nas páginas', () => {
  test('Testando as rotas', () => {
    const { history } = renderWithRouter(<App />);

    // verifica se o footer não possue na página de Login
    const searchFooter = screen.queryByTestId('footer');
    expect(searchFooter).toBeNull();

    // verifica se possui footer na pagina de Comidas
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
    console.log(screen.queryByTestId('footer'));
    expect(screen.queryByTestId('footer')).toBeInTheDocument();
  });
});
