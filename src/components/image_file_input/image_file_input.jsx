import React, { memo, useRef, useState } from "react";
import styles from "./image_file_input.module.css";

const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonclick = (event) => {
    // input 태그는 보여주지 않고 대신 button을 보여준 다음 버튼을 클릭시 input을 클릭하도록 코딩
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    inputRef.current.click();
  };
  const onChange = async (event) => {
    /**
     * 동기적으로 작동하게 하는 방법
     * 1) image_updloader.js에서 async로 정의되어 있어서 .then().then().then().... 으로 가능
     * 2) onChange 함수를 async 붙여서 사용
     */
    /**
         imageUploader
        .upload(event.target.files[0])
        .then(console.log);
       */
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonclick}
        >
          {name || "No file"}
        </button>
      )}
      {loading && <div className={styles.loading}></div>}
    </div>
  );
});

export default ImageFileInput;
