  import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL:process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp;

  // https://console.firebase.google.com/project/business-card-maker-f6eba/authentication/providers 여기서 사용할 로그인을 설정해줘야 한다. 로그인 제공업체는 다양함 (구글, 전화, 야후, 깃헙, 이메일 등등)
