import { FC } from "react";
import { StolenCase } from "../entities/stolen-case";
import styles from './card-list-item.module.css';

interface CardListItemProps {
  bike: StolenCase;
}

const CardListItem: FC<CardListItemProps> = ({ bike }) => {
  return (
    <div className={styles["card-item"]}>
      <figure>
        {bike.thumb ? (
          <img
            loading="lazy"
            src={bike.thumb}
            alt={bike.title}
            className={styles["img"]}
          />
        ) : (
          <img src={"/bicycle.png"} alt={"Default bike"} className={styles["img"]} />
        )}
      </figure>
      <div className={styles["texts"]}>
        <div className={styles["name"]}>{bike.title}</div>
        <div className="description">
          {bike.description ? bike.description : "Sin descripción"}
        </div>
        <div className="description">
          {bike.stolen_location
            ? `Ubicación: ${bike.stolen_location}`
            : "Sin ubicación"}
        </div>
        <div className="dates">
          {new Date(bike.date_stolen).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CardListItem;
