
import styles from "./Grid_Cards.module.css";
import { featuredCollections } from '../../data/collections';


   const GridCards = () => {

    return (
          <div className={styles.container}>
            {featuredCollections.map((card) => (
              <div key={card.title} className={styles.cards}>
                <div className={styles.card_item}>
                  <div className={styles.card_image}>
                  
                  </div>
                  <div className={styles.card_info}>
                    <h2 className={styles.card_title}>{card.title}</h2>
                    <p className={styles.card_intro}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
    );
   };




export default GridCards ;
