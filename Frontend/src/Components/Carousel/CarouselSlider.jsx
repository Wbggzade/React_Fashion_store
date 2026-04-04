
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Styles from './Carousel.module.css';
import { toAbsoluteImageUrl } from '../../services/apiConfig';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarouselSlider = ({ products = [] }) => {
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <Carousel responsive={responsive}>
      {products.map((product) => (
        <div key={product._id} className={Styles.card}>
          {product.image && (
            <img
              className={Styles.cardImage}
              src={toAbsoluteImageUrl(product.image)}
              alt={product.name}
            />
          )}
          <div>
            <p className={Styles.label}>{product.category}</p>
            <h2>{product.name}</h2>
            <p className={Styles.price}>${product.price.toFixed(2)}</p>
          </div>
          <button type="button" onClick={() => navigate('/shop')}>
            View in Shop
          </button>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselSlider;
