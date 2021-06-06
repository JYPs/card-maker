import React from "react";
import Button from "../button/button";
// import ImageFileInput from "../image_file_input/image_file_input"; --> index에서 FileInput 컴포넌트 자체를 prop으로 넘겨오는 방식으로 변경
import styles from "./card_edit_form.module.css";

const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
  const { name, company, title, email, message, theme, fileName, fileURL } =
    card;

  const onChange = (param) => {
    // parma vs event 차이점이 무엇인지 정확히 알고 넘어가야함.!!!! - 2021 06 02 질문을 남겨둠
    console.debug(
      "onChange event",
      param.currentTarget.value,
      // eslint-disable-next-line no-restricted-globals
      event.target.value
    );
    if (param.currentTarget === null) {
      return;
    }
    param.preventDefault();
    updateCard({
      ...card,
      [param.currentTarget.name]: param.currentTarget.value,
    });
  };
  const onSubmit = () => {
    console.log("삭제시 card", card);
    deleteCard(card);
  };
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        name="company"
        value={company}
        onChange={onChange}
      />
      <select
        className={styles.select}
        name="theme"
        value={theme}
        onChange={onChange}
      >
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="colorful">colorful</option>
      </select>
      <input
        className={styles.input}
        type="text"
        name="title"
        value={title}
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        name="email"
        value={email}
        onChange={onChange}
      />
      <textarea
        className={styles.textarea}
        name="message"
        value={message}
        onChange={onChange}
      />
      <div className={styles.fileInput}>
        <FileInput />
      </div>
      <Button name="Delete" onClick={onSubmit} />
    </form>
  );
};

export default CardEditForm;
