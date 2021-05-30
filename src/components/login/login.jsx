import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const history = useHistory();
  const goToMaker = (userId) => {
    // history.push로 페이지 이동 및 값 전달하는 방법
    history.push({
      pathname: "/maker",
      // state란 키 값은 내가 원하는걸로 변경 가능함
      state: {
        id: userId,
      },
    });
  };
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      // .then(console.log);
      .then((data) => goToMaker(data.user.uid));
  };

  useEffect(() => {
    /**
     * auth_service.js에서 실행 시킬 콜백함수를 넘기는 것이다!
     */
    authService //
      .onAuthChange((user) => {
        user && goToMaker(user.uid);
      });
  });
  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={(e) => onLogin(e)}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
