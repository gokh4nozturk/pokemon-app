import React from 'react';
import { Link } from 'react-router-dom';

import './stylesLayout.less';

const Layout = ({ title, children }) => (
  <>
    <nav>
      <Link to="/">
        <h2>Pokemon App</h2>
      </Link>
    </nav>
    <main>{children}</main>
    <footer>
      <a href="https://pokeapi.co/" target="blank">
        PokeApi
      </a>
    </footer>
  </>
);

export default Layout;
