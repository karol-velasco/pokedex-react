import { useEffect, useState } from "react";

import {
  obtenerEquipo,
  actualizarPokemon,
  eliminarPokemon,
} from "../services/equipoApi";

function MiEquipo({ actualizarEquipo }) {
  const [equipo, setEquipo] = useState([]);
  const [error, setError] = useState("");

  const cargarEquipo = async () => {
    try {
      setError("");

      const datos = await obtenerEquipo();

      setEquipo(datos);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    cargarEquipo();
  }, [actualizarEquipo]);

  const subirNivel = async (pokemon) => {
    await actualizarPokemon(pokemon.id, {
      nivel: pokemon.nivel + 1,
    });

    cargarEquipo();
  };

  const cambiarFavorito = async (pokemon) => {
    await actualizarPokemon(pokemon.id, {
      favorito: !pokemon.favorito,
    });

    cargarEquipo();
  };

  const liberarPokemon = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres liberar este Pokémon?",
    );

    if (!confirmar) return;

    await eliminarPokemon(id);

    cargarEquipo();
  };

  return (
    <section className="team-section" id="equipo">
      <div className="team-heading">
        <div>
          <span>MI COLECCIÓN</span>

          <h2>Mi equipo Pokémon</h2>

          <p>Los Pokémon que forman parte de tu aventura.</p>
        </div>

        <div className="team-counter">
          <strong>{equipo.length}</strong>

          <span>Pokémon</span>
        </div>
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}

      {equipo.length === 0 ? (
        <div className="empty-team">
          <div className="empty-icon">◒</div>

          <h3>Tu equipo está vacío</h3>

          <p>Busca tu primer Pokémon y agrégalo para comenzar tu aventura.</p>

          <a href="#buscar">Buscar Pokémon</a>
        </div>
      ) : (
        <div className="team-grid">
          {equipo.map((pokemon) => (
            <article
              className={`team-card ${pokemon.favorito ? "favorite" : ""}`}
              key={pokemon.id}
            >
              {pokemon.favorito && (
                <div className="favorite-badge">♥ Favorito</div>
              )}

              <button
                className="heart-button"
                onClick={() => cambiarFavorito(pokemon)}
              >
                {pokemon.favorito ? "♥" : "♡"}
              </button>

              <div className="team-image">
                <img src={pokemon.imagen} alt={pokemon.nombre} />
              </div>

              <div className="team-info">
                <span className="team-level">NIVEL {pokemon.nivel}</span>

                <h3>{pokemon.nombre}</h3>

                <div className="level-progress">
                  <span
                    style={{
                      width: `${Math.min(pokemon.nivel * 10, 100)}%`,
                    }}
                  ></span>
                </div>

                <div className="team-actions">
                  <button
                    className="level-button"
                    onClick={() => subirNivel(pokemon)}
                  >
                    ↑ Subir nivel
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => liberarPokemon(pokemon.id)}
                  >
                    Liberar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MiEquipo;
