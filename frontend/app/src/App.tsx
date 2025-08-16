import './App.css'
import Head from './headers/headers_components'
import Product from './products/products_components'
import { Routes, Route, BrowserRouter } from "react-router";
import Singin from './checkout/sign_components';
import Carrinho from './checkout/carrinho';

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/signin" element={<Singin />} />
            <Route path="/checkout" element={<Carrinho/>}/>
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
