
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Styles from './Carousel.module.css';


const featuredItems = [
  {
    title: 'Signature Outerwear',
    description: 'Lightweight trench shapes and structured jackets for transitional dressing.'
  },
  {
    title: 'Modern Occasionwear',
    description: 'Clean evening silhouettes with understated detail and confident finish.'
  },
  {
    title: 'Accessories Update',
    description: 'Bags, belts, and jewelry designed to sharpen every look in one step.'
  },
  {
    title: 'New In Footwear',
    description: 'Minimal boots and refined flats built for comfort, polish, and repeat wear.'
  }
];





const CarouselSlider = () =>{
const navigate = useNavigate();

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



   
  

    return(
    <Carousel responsive={responsive}>
      {featuredItems.map((item) => (
        <div key={item.title} className={Styles.card}>
          <div>
            <p className={Styles.label}>Featured</p>
            <h2>{item.title}</h2>
            <p className={Styles.description}>{item.description}</p>
          </div>
          <button type="button" onClick={() => navigate('/shop')}>View in Shop</button>
        </div>
      ))}
    </Carousel>


    );
  };



export default CarouselSlider ;
