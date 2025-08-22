import './App.css'
import Head from './headers/headers_components'
import Product from './products/products_components'
import { Routes, Route, BrowserRouter } from "react-router";
import Singin from './checkout/sign_components';
import Carrinho from './checkout/carrinho';
import Men from './products/men_components';
import Women from './products/women_components';

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/signin" element={<Singin />} />
            <Route path="/checkout" element={<Carrinho/>}/>
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
