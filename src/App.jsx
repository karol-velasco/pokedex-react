import { useState } from "react";
import Pokedex from "./pages/Pokedex";
import MiEquipo from "./pages/MiEquipo";
import "./styles.css";

function App() {
  const [actualizarEquipo, setActualizarEquipo] = useState(0);

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <div className="logo-ball">
            <span></span>
          </div>

          <div>
            <h1>
              Poké<span>Dex</span>
            </h1>
            <small>Mi aventura Pokémon</small>
          </div>
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#buscar">Buscar Pokémon</a>
          <a href="#equipo">Mi equipo</a>
        </nav>
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <span className="hero-tag">✦ POKÉDEX PERSONAL</span>

            <h2>
              Descubre tu próximo
              <span> Pokémon favorito</span>
            </h2>

            <p>
              Busca Pokémon, conoce sus características y crea tu propio equipo.
            </p>

            <a href="#buscar" className="hero-button">
              Comenzar aventura
              <span>→</span>
            </a>
          </div>

          <div className="hero-decoration">
            <div className="big-pokeball"></div>
            <div className="circle-decoration"></div>
          </div>
        </section>

        <Pokedex
          onPokemonAgregado={() => setActualizarEquipo((valor) => valor + 1)}
        />

        <hr />

        <MiEquipo actualizarEquipo={actualizarEquipo} />
      </main>

      <footer>
        <div>
          <strong>PokéDex</strong>
        </div>
      </footer>
    </div>
  );
}

export default App;
