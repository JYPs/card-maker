import firebase from 'firebase';

// 어플리케이션에서 사용자가 로그인 하거나 로그아웃을 하거나 이런 authentication에 관련된 일을 하는 class
class AuthService {
    login(providerName) {
        // providerName은 firebase.google.com/docs/auth/google-signin 등 각각의 문서를 보면 
        // new firebase.auth.GoogleAuthProvider();
        // new firebase.auth.GithubAuthProvider();
        // 이런식으로 firebase 안에 있는 auth에서 각각의 메서드를 호출 하기때문에 공통 코드를 빼냄

        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebase.auth().signInWithPopup(authProvider);
    }
}

export default AuthService;