/* SECCIÓN DE IMPORT */
import '../styles/App.scss';
import image from '../images/friends-logo-cover.png';
// import phrases from '../data/phrases.json';
import { useEffect, useState } from 'react';
/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [allData, setAllData] = useState([]);
  const [searchQuote, setSearchQuote] = useState('');//búsqueda por cita
  const [filterCharacter, setFilterCharacter] = useState('all');//filtro por personaje
  const [newQuote, setNewQuote] = useState({ //nueva frase + personaje
    quote: '',
    character: '',
  });
  // const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch ('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then(response => response.json())
      .then(data => {
        setAllData(data);
      });
    }, []);

      /* FUNCIONES HANDLER */
  const handleFilterQuote = (ev) => {
      setSearchQuote(ev.target.value);
    };

  const handleFilterCharacter = (ev) => {
    ev.preventDefault();
    setFilterCharacter(ev.target.value);
  };

  const handleNewQuote = (ev) => {
    setNewQuote({...newQuote, [ev.target.id] : ev.target.value})
  };

  const handleClick = (ev) => {
    ev.preventDefault();
      if (newQuote.quote !== '' && newQuote.character !== ''){
        setAllData([...allData, newQuote]);//quédate con lo q ya tienes y añade newQuote
        setNewQuote ({quote: "", character: "",});//limpia los inputs
      }else{
      const errorMsg = 'Tienes que rellenar los dos campos';
      console.log(errorMsg);
    }
  }

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  const renderList = () => {
    return allData
    .filter((eachQuote) => {
      if(filterCharacter === 'all'){
        return true;
      }else if (eachQuote.character.toLocaleLowerCase().includes(filterCharacter.toLocaleLowerCase())) {
        return true;
      }else{
        return false;
      }
    })
    .filter((eachQuote) => eachQuote.quote.toLocaleLowerCase().includes(searchQuote.toLocaleLowerCase()))
    .map((eachQuote, index) => (
      <li key={index} className='li'>
        <p>Personaje: {eachQuote.character}</p>
        <p>Frase: {eachQuote.quote}</p>
      </li>
    ))
  };
  /* HTML */
  return (
    <div className="page">
      {/* header */}
      <header className='header'>
        <img className='header__img' src={image} alt="logo sofa friends" />
        <h1>Frases de Friends</h1>
      </header>
      {/* main filter*/}
      <main>
      <form>
          <fieldset>
            <legend>Filtrar por frase</legend>
            <input
              name="search"
              placeholder="Filtrar por frase"
              onInput={handleFilterQuote}
              value={searchQuote}
              />
          </fieldset>
          <fieldset>
            <legend>Filtrar por personaje</legend>
              <select
                id="character"
                onChange={handleFilterCharacter}
                value={filterCharacter}>
                <option value="all">Todos</option>
                <option value="Joey">Joey</option>
                <option value="Rachel">Rachel</option>
                <option value="Chandler">Chandler</option>
                <option value="Phoebe">Phoebe</option>
                <option value="Ross">Ross</option>
                <option value="Monica">Monica</option>
              </select>
          </fieldset>
        </form>
        {/*phrases list */}
        <section>
          <ul className='ul'>{renderList()}</ul>
        </section>
        {/* new phrase */}
        <form>
          <h2 >Añadir una nueva frase</h2>
            <input
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            onInput={handleNewQuote}
            value={newQuote.character}
            />
          <input
            type="text"
            name="quote"
            id="quote"
            placeholder="Frase"
            onInput={handleNewQuote}
            value={newQuote.quote}
            />
          <input
            type="submit"
            value="Añadir una nueva frase"
            onClick={handleClick}
            />
        </form>
      </main>
    </div>
  );
}

export default App;

