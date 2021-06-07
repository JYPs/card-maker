import { firebaseAuth, githubProvider, googleProvider } from './firebase';

// 어플리케이션에서 사용자가 로그인 하거나 로그아웃을 하거나 이런 authentication에 관련된 일을 하는 class
class AuthService {
    login(providerName) {
        // providerName은 firebase.google.com/docs/auth/google-signin 등 각각의 문서를 보면 
        // new firebase.auth.GoogleAuthProvider();
        // new firebase.auth.GithubAuthProvider();
        // 이런식으로 firebase 안에 있는 auth에서 각각의 메서드를 호출 하기때문에 공통 코드를 빼냄

        // const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        // return firebase.auth().signInWithPopup(authProvider);
        // return firebaseAuth.signInWithPopup(authProvider);
        /**
         * 주석처리된 firebase를 사용하면 No Firebase App '[DEFAULT]' has been created - call Firebase App.initializeApp() 라는 에러가 발생
         * 에러를 보면 Firebase는 App.initializeApp() 호출을 통해 Firebase App을 만들라고 되어 있음!
         * 
         * 따라서 firebase.js에서 initialize된 앱을 export 해서 그것을 사용하면된다
         * firebase.js에서 firebase.initializeApp(firebaseConfig);의 인터페이스를 보면 firebase api에서 제공하는 것과 동일한 인터페이스임
         */

        const authProvider = this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider);
    }

    // 사용자의 로그인 상태가 변경될 때마다 호출
    onAuthChange(onUserChanged) {
        firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        });
    }

    // logout 처리
    logout() {
        firebaseAuth.signOut();
      }

      getProvider(providerName) {
          console.debug('providerName :::', providerName);
          switch(providerName) {
            case 'Google':
                return googleProvider;
            case 'Github':
                return githubProvider;
            default:
                throw new Error(`not supported provider ${providerName}`);
          }
      }
}

export default AuthService;