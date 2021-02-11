import { useEffect, useState } from 'react';
import './App.css';
import Calories from './Calories';

function App() {
  const APP_ID = "6090e46f";
  const APP_KEY = "3f6ba24ea1f996f34aafb8156ec574e8";

  const [ cals, setRecipes ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ query, setQuery ] = useState('chicken');

  
  useEffect( async () => {
    getCalories();
  }, [query])

  const getCalories = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button className="search-button" type='submit'>Search</button>  
      </form>
      <div className="recipes">
      {cals.map(recipe => (
        <Calories 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
