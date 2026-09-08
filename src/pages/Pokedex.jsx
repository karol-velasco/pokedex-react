import { useState } from "react";
import { buscarPokemon } from "../services/pokeApi";
import { agregarAlEquipo } from "../services/equipoApi";

function Pokedex({ onPokemonAgregado }) {

  const [busqueda, setBusqueda] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {

    if (!busqueda.trim()) {
      setError("Escribe el nombre de un Pokémon");
      return;
    }

    try {

      setCargando(true);
      setError("");
      setPokemon(null);

      const datos = await buscarPokemon(busqueda);

      setPokemon(datos);

    } catch (error) {

      setError(error.message);

    } finally {

      setCargando(false);

    }
  };


  const agregarPokemon = async () => {

    if (!pokemon) return;

    const nuevoPokemon = {

      nombre: pokemon.name,

      imagen:
        pokemon.sprites.other?.["official-artwork"]?.front_default ||
        pokemon.sprites.front_default,

      nivel: 1,

      favorito: false
    };

    try {

      await agregarAlEquipo(nuevoPokemon);

      onPokemonAgregado();

      alert(`${pokemon.name} fue agregado a tu equipo 💜`);

    } catch (error) {

      setError(error.message);

    }
  };


  const manejarEnter = (evento) => {

    if (evento.key === "Enter") {
      buscar();
    }

  };


  return (

    <section className="search-section" id="buscar">

      <div className="section-title">

        <span>POKÉDEX</span>

        <h2>Busca un Pokémon</h2>

        <p>
          Escribe el nombre o número del Pokémon que quieres conocer.
        </p>

      </div>


      <div className="search-box">

        <div className="search-input">

          <span>⌕</span>

          <input
            type="text"
            value={busqueda}
            placeholder="Ejemplo: pikachu"
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
            onKeyDown={manejarEnter}
          />

        </div>

        <button onClick={buscar}>
          {cargando ? "Buscando..." : "Buscar"}
        </button>

      </div>


      {error && (

        <div className="error-message">
          ⚠️ {error}
        </div>

      )}


      {pokemon && (

        <article className="pokemon-result">

          <div className="pokemon-image-container">

            <div className="pokemon-number">
              #{String(pokemon.id).padStart(3, "0")}
            </div>

            <img
              src={
                pokemon.sprites.other?.["official-artwork"]?.front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
            />

          </div>


          <div className="pokemon-information">

            <span className="pokemon-label">
              POKÉMON ENCONTRADO
            </span>

            <h3>
              {pokemon.name}
            </h3>


            <div className="types">

              {pokemon.types.map((tipo) => (

                <span
                  className={`type type-${tipo.type.name}`}
                  key={tipo.type.name}
                >
                  {tipo.type.name}
                </span>

              ))}

            </div>


            <div className="pokemon-details">

              <div>
                <span>Altura</span>
                <strong>{pokemon.height / 10} m</strong>
              </div>

              <div>
                <span>Peso</span>
                <strong>{pokemon.weight / 10} kg</strong>
              </div>

              <div>
                <span>Experiencia</span>
                <strong>{pokemon.base_experience}</strong>
              </div>

            </div>


            <h4>Estadísticas base</h4>

            <div className="stats">

              {pokemon.stats.slice(0, 4).map((stat) => (

                <div className="stat" key={stat.stat.name}>

                  <div className="stat-name">

                    <span>
                      {stat.stat.name}
                    </span>

                    <strong>
                      {stat.base_stat}
                    </strong>

                  </div>

                  <div className="stat-bar">

                    <span
                      style={{
                        width: `${Math.min(
                          stat.base_stat / 2,
                          100
                        )}%`
                      }}
                    ></span>

                  </div>

                </div>

              ))}

            </div>


            <button
              className="add-button"
              onClick={agregarPokemon}
            >
              <span>♡</span>
              Agregar a mi equipo
            </button>

          </div>

        </article>

      )}

    </section>

  );
}

export default Pokedex;