import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import CardRepository from './service/card_repository';

const authService = new AuthService();
const imageUploader = new ImageUploader();
// FileInput은 컴포넌트 자체를 prop으로 전달.
// --> 장점 : 쓸뎅ㅄ이 많은 서비스를 전달하지 않아도 된다, FileInput이 조금더 많은 서비스가 필요로 한다면 index에서만 추가 수정이 가능하다
const FileInput = props => (<ImageFileInput {...props} imageUploader={imageUploader} />);

const cardRepository = new CardRepository();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} cardRepository={cardRepository}/>
  </React.StrictMode>,
  document.getElementById('root')
);
