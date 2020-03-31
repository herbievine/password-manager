function redirectCheck() {
    const firebaseConfig = {
        apiKey: "<apiKey>",
        authDomain: "<authDomain>",
        databaseURL: "<databaseURL>",
        projectId: "<projectId>",
        storageBucket: "<storageBucket>",
        messagingSenderId: "<messagingSenderId>",
        appId: "<appId>",
        measurementId: "<measurementId>"
    };

    firebase.initializeApp(firebaseConfig);

    // const url = window.location.href.split('/');

    firebase.auth().onAuthStateChanged(u => {
        if (u) {
            console.log(u);
            document.getElementById('signup').style.display = 'none';
            document.getElementById('login').style.display = 'none';
            // if (url[3] === 'login.html' || url[3] === 'signup.html') {
            //     window.location.href = 'account.html';
            // }
        } else {
            console.log('Not logged in');
            document.getElementById('account').style.display = 'none';
            // if (url[3] === 'account.html') {
            //     window.location.href = 'login.html';
            // }
        }
    });
}