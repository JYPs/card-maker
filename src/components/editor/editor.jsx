import React from "react";
import CardAddForm from "../card_add_form/card_add_form";
import CardEditForm from "../card_edit_form/card_edit_form";
import styles from "./editor.module.css";

const Editor = ({ FileInput, cards, addCard, updateCard, deleteCard }) => (
  <section className={styles.editor}>
    <h1 className={styles.title}>Card Maker</h1>
    {/* Case 1 : cards가 배열로 선언되어 있었을때 사용하는 방법 
    {cards.map((card) => (
      <CardEditForm
        key={card.id}
        card={card}
        updateCard={updateCard}
        deleteCard={deleteCard}
      />
    ))} */}

    {/* Case 2 : cards가 오브젝트로 선언되어 있었을때 사용하는 방법 - Object.keys() 이용이 포인트  */}
    {Object.keys(cards).map((key) => {
      console.debug("key ?????", key);
      return (
        <CardEditForm
          key={key}
          FileInput={FileInput}
          card={cards[key]}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      );
    })}
    <CardAddForm FileInput={FileInput} onAdd={addCard} />
  </section>
);

export default Editor;
