import { NavBar } from "../components/navBar/navBar"
import { Footer } from "../components/footer/footer"
import { Card } from "../components/card/card";
export const Bodega = () => {
  const products = [
    {
      id: 1,
      name: "Malbec Argentino",
      description: "Vino tinto argentino con notas frutales y especiadas.",
      price: "$20",
      image: "https://images.vexels.com/media/users/3/215895/isolated/preview/36ec60399b703a700d20bec25f1c2ce8-botella-de-vino-y-trazo-de-vidrio.png"
    },
    {
      id: 2,
      name: "Tempranillo Español",
      description: "Vino tinto español con sabor a frutas rojas y toques de vainilla.",
      price: "$15",
      image: "https://images.vexels.com/media/users/3/215895/isolated/preview/36ec60399b703a700d20bec25f1c2ce8-botella-de-vino-y-trazo-de-vidrio.png"
    },
    {
      id: 3,
      name: "Chardonnay Francés",
      description: "Vino blanco francés con aromas a frutas tropicales y mantequilla.",
      price: "$25",
      image: "https://images.vexels.com/media/users/3/215897/isolated/preview/ee3f0d402e7930d14021a340386ce9d3-dibujo-de-linea-elegante-copa-de-vino.png"
    },
    {
      id: 4,
      name: "Carmenere Chileno",
      description: "Vino tinto chileno con notas a pimienta negra y frutos oscuros.",
      price: "$18",
      image: "https://images.vexels.com/media/users/3/215895/isolated/preview/36ec60399b703a700d20bec25f1c2ce8-botella-de-vino-y-trazo-de-vidrio.png"
    }, 
    {
      id: 5,
      name: "Sauvignon Blanc Neozelandés",
      description: "Vino blanco neozelandés con sabores cítricos y hierba recién cortada.",
      price: "$22",
      image: "https://images.vexels.com/media/users/3/215897/isolated/preview/ee3f0d402e7930d14021a340386ce9d3-dibujo-de-linea-elegante-copa-de-vino.png"
    },
    {
      id: 6,
      name: "Merlot Italiano",
      description: "Vino tinto italiano con cuerpo medio y suaves taninos.",
      price: "$19",
      image: "https://images.vexels.com/media/users/3/215895/isolated/preview/36ec60399b703a700d20bec25f1c2ce8-botella-de-vino-y-trazo-de-vidrio.png"
    },
    {
      id: 7,
      name: "Pinot Noir Californiano",
      description: "Vino tinto californiano con delicados aromas a frutos rojos y especias.",
      price: "$30",
      image: "https://images.vexels.com/media/users/3/215895/isolated/preview/36ec60399b703a700d20bec25f1c2ce8-botella-de-vino-y-trazo-de-vidrio.png"
    },
    {
      id: 8,
      name: "Riesling Alemán",
      description: "Vino blanco alemán con acidez refrescante y notas florales.",
      price: "$24",
      image: "https://images.vexels.com/media/users/3/215897/isolated/preview/ee3f0d402e7930d14021a340386ce9d3-dibujo-de-linea-elegante-copa-de-vino.png"
    }
  ];



  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center w-full h-auto bg-base-200 mt-20">
        <div className="h-auto w-full md:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-2 m-4">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
