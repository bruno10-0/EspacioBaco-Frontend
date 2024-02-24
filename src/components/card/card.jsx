/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'; // Importa Link desde React Router

export const Card = ({ product }) => {
  return (
    <Link to="/#" className="bg-base-100 rounded-badge shadow-lg p-2 cursor-pointer" style={{ textDecoration: 'none' }}>
      <div className="flex justify-center items-center" style={{ height: "220px", flexShrink: "0" }}>
        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain object-center" />
      </div>

      <div className='flex flex-col items-center justify-center gap-2 p-2'>
        <h1 style={{ letterSpacing: "2px", fontSize: "15px" }}>
          {product.name}
        </h1>
        <h2 className="text-center" style={{ letterSpacing: "2px", fontSize: "13px" }}>
          {product.description}
        </h2>
        <h3 className="text-accent" style={{ letterSpacing: "2px", fontSize: "12px" }}>
          {product.price}
        </h3>
      </div>
    </Link>
  );
};
