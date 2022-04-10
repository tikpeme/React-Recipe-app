import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { Link } from "react-router-dom";


function Searched() {

  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) =>{
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${process.env.REACT_APP_API_KEY}`
    )
    const recipes = await data.json();
    setSearchedRecipes(recipes.results)

};

useEffect(()=>{
  getSearched(params.search);

},[params.search])


  return (
    <Grid>
      {searchedRecipes.map((recipe)=>{
        return(
          <Link to ={'/Recipe/'+recipe.id}>
          <Card key ={recipe.id}>
            <img src ={recipe.image} alt={recipe.image}></img>
            <h4>{recipe.title}</h4>
          </Card>
          </Link>
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap: 3rem;
`
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;

    }
`

export default Searched