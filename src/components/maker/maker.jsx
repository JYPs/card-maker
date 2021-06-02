import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "jyp",
      company: "Samsung",
      theme: "dark",
      title: "Software Engineer",
      email: "jyp@gmail.com",
      message: "go for it",
      fileName: "blank____!!",
      fileURL: null,
    },
    {
      id: "2",
      name: "jyp22",
      company: "Samsung22",
      theme: "light",
      title: "Software Engineer22",
      email: "jyp@gmail.com22",
      message: "go for it22",
      fileName: "blank____!!22",
      fileURL: "ellie.png",
    },
    {
      id: "3",
      name: "jyp33",
      company: "Samsung33",
      theme: "colorful",
      title: "Software Engineer33",
      email: "jyp@gmail.com33",
      message: "go for it33",
      fileName: "blank____!!33",
      fileURL: null,
    },
  ]);
  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService //
      .onAuthChange((user) => {
        if (!user) {
          history.push("/");
        }
      });
  });

  const addCard = (card) => {
    console.log("card", card);
    const updated = [...cards, card];
    setCards(updated);
  };
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={addCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
