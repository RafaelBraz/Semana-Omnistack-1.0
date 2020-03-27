import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';

import Routes from './src/routes';

// Componente
export default function App() {
  return (
    <Routes />
  );
}

/**
 * 
 * Div, Section, Header, Footer, etc -> View
 * p, h1, h2, b, etc -> Text
 * 
 * O display sempre é "flex"
 *
 * Não existe herança de estilo
 *  
 */