import Home from "./Home"
import {Route, Routes, useLocation} from 'react-router-dom'
import Cuisine from "./Cuisine"
import Searched from "../pages/Searched"
import Recipe from "./Recipe"
import { AnimatePresence } from "framer-motion"


function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence
    exitBeforeEnter
    >
    <Routes location={location} key={location.pathname}>
        <Route path= "/" element = {<Home />} />
        <Route path= "/cuisine/:type" element={<Cuisine />} />
        <Route path= "/Searched/:search" element ={<Searched /> } />
        <Route path= "/Recipe/:id" element = {<Recipe/>}/>
    </Routes>
</AnimatePresence>
  )
}

export default Pages