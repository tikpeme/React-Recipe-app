import { useEffect, useState } from "react"
import styled from 'styled-components' 
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";

function Popular() {

  const [popular, setPopular] = useState([]) 

  useEffect(() =>{
    getPopular();
  },[])

  const getPopular = async () =>{

  const check = localStorage.getItem('popular') // check to see if there is a popular array in a local storage

  if(check){ // in storage memory set it to the the popular object
    setPopular(JSON.parse(check));// parse stored string (in JSON format) into an array
  }
  else{//if nothing in storage memory, make api call and store in in the 'popular' object and store in local storage
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
    const data = await api.json()// provde JSON format 

    localStorage.setItem('popular', JSON.stringify(data.recipes))
    setPopular(data.recipes);

  } 
}

  return (
    <div>
       <Wrapper>
         <h3> Popular Picks</h3>
          <Splide 
            options ={{
              perPage: 4,
              arrows : false,
              pagination : false,
              drag : 'free',
              gap: '5rem', 
              wheel: true,
              waitForTransition: true

            }}
          >
         {popular.map((recipe) => {  
           return(
             <SplideSlide key ={recipe.id}>  
             <Link to ={'/Recipe/'+recipe.id}>
             <Card>
               <p>{recipe.title}</p>
               <img src = {recipe.image} alt ={recipe.title}/>
              <Gradient />
             </Card>
             </Link>
             </SplideSlide>
             )
            }
            )
         }
         </Splide>
       </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
margin: 4rem 0rem;
`;

const Card = styled.div`
min-height: 25rem;
border-radius: 5rem; 
overflow: hidden;
position: relative;

img{
  border-radius: 2rem;
  position: absolute;
  left :0;
  width: 100%;
  height: 100%;
  
}
p{
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom:0%;
  transform: translate(-50%, 0); 
  color : white;
  width: 100%;
  text-align: center;
  font-weight: 500;
  font-size: 2rem;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center
}
`;

const Gradient = styled.div`
z-index: 3 ;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8)); 
`

export default Popular