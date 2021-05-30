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
      title: "Software Engineer",
      email: "jyp@gmail.com",
      messgae: "go for it",
      fileName: "blank____!!",
      fileURL: "",
    },
    {
      id: "2",
      name: "jyp22",
      company: "Samsung22",
      title: "Software Engineer22",
      email: "jyp@gmail.com22",
      messgae: "go for it22",
      fileName: "blank____!!22",
      fileURL: "",
    },
    {
      id: "3",
      name: "jyp33",
      company: "Samsung33",
      title: "Software Engineer33",
      email: "jyp@gmail.com33",
      messgae: "go for it33",
      fileName: "blank____!!33",
      fileURL: "",
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
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
