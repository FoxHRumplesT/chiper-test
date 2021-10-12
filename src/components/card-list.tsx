import { FC } from "react";
import { StolenCase } from "../entities/stolen-case";
import CardListItem from "./card-list-item";

import styles from "./card-list.module.css";

interface CardListProps {
  cases: StolenCase[];
}

const CardList: FC<CardListProps> = ({ cases }) => {
  return (
    <ul className={styles["card-list"]}>
      {cases.map((bike, i) => (
        <li key={`${bike.date_stolen}-${i}`}>
          <CardListItem bike={bike} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
