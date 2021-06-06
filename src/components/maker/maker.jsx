import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  /* useState에서 기본 값을 배열에 담아서 셋팅함
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
  */
  //  기본 값을 배열이 아닌 Object에 담아서 셋팅함, key 값은 id 값으로 셋팅 --> fireBase이용하게 되면 디폴트 값 필요가 없어짐
  const [cards, setCards] = useState({
    // 1: {
    //   id: "1",
    //   name: "jyp",
    //   company: "Samsung",
    //   theme: "dark",
    //   title: "Software Engineer",
    //   email: "jyp@gmail.com",
    //   message: "go for it",
    //   fileName: "blank____!!",
    //   fileURL: null,
    // },
    // 2: {
    //   id: "2",
    //   name: "jyp22",
    //   company: "Samsung22",
    //   theme: "light",
    //   title: "Software Engineer22",
    //   email: "jyp@gmail.com22",
    //   message: "go for it22",
    //   fileName: "blank____!!22",
    //   fileURL: "ellie.png",
    // },
    // 3: {
    //   id: "3",
    //   name: "jyp33",
    //   company: "Samsung33",
    //   theme: "colorful",
    //   title: "Software Engineer33",
    //   email: "jyp@gmail.com33",
    //   message: "go for it33",
    //   fileName: "blank____!!33",
    //   fileURL: null,
    // },
  });
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();
  }, [userId]);
  useEffect(() => {
    authService //
      .onAuthChange((user) => {
        if (user) {
          setUserId(user.uid);
          // history.push("/");
        } else {
          history.push("/");
        }
      });
  });

  // cards를 Object로 변경함에 따라 updateCard()로 통합 시킴
  /* const addCard = (card) => {
    console.log("card", card);
    const updated = [...cards, card];
    setCards(updated);
  };*/

  const createOrUpdateCard = (card) => {
    // console.log("updateCard card", card);
    // map을 이용한 setState는 배열이 길이 만큼 속도가 느려져서 좋지 않다(해빗트래커에서 사용했던 방식임)
    // --> Object.key() 이용으로 대체하면 성능이 개선 된다! 빠르다~
    /**
     * 배열 + map은 state의 모든 데이터를 일주 후 item을 리턴 하는 반면 object는 key만 일주 하고 return
     * 하기 때문에 속도가 빠르다
     */
    /* 
    const jyp = {
      id: "123",
      name: "JYP",
    };
    console.log(jyp.id); // 123
    console.log(jyp["id"]); // 123  둘 모두 동일한 결과값
    */

    // ****** Case 1 : setCards가 비동기적으로 되어서 오래된 값일 수도 있다. *******
    // const updated = { ...cards }; // 1 step : state인 cards를 모두 복사해 온다
    // updated[card.id] = card; // 2 step : card의 id를 이용해서 복사된 값에 함수의 파람으로 받은 card를 변경
    // setCards(updated); // 3 step : setState 해준다

    // ****** Case 2 : callback을 이용해서 동기적으로 할 수도 있다. **********
    setCards((cards) => {
      // cards는 딱 그 시점(setCards()가 실행되는 시점)의 state에 담긴 값 = 오래된 값이 아님
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };
  const deleteCard = (card) => {
    // console.debug("deleteCard :::: ", card);
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id]; // delete ??? 이게 뭐지 이런게 된다고????ㅋㅋㅋㅋ
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
