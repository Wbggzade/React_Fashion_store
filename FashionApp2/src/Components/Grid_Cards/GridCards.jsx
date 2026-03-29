
import styles from "./Grid_Cards.module.css" ;


const cardContent = [
  {
    title: 'Tailored Essentials',
    description: 'Sharp layers, clean lines, and everyday pieces that bring structure to your weekly wardrobe.'
  },
  {
    title: 'Weekend Softs',
    description: 'Relaxed knitwear, fluid separates, and easy neutrals made for off-duty styling.'
  },
  {
    title: 'After-Dark Edit',
    description: 'Statement textures and elevated finishing pieces for evenings that call for a stronger look.'
  }
];


   const GridCards = () => {

    return (
          <div className={styles.container}>
            {cardContent.map((card) => (
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
