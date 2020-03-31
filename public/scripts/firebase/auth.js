function getUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.querySelector('#acc-name').innerText = `Full Name: ${user.displayName}`;
            document.querySelector('#acc-email').innerText = `Email: ${user.email}`;
        } else {
            window.location.href = 'login.html';
        }
    });
}

function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
        return !!user;
    });
}

function emailSignUp() {
    if (!checkIfLoggedIn()) {
        const name = document.querySelector('#name-input-signup').value;
        const email = document.querySelector('#email-input-signup').value;
        const password = document.querySelector('#password-input-signup').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        user.updateProfile({
                            displayName: name
                        }).then(() => {
                            window.location.href = 'account.html';
                        }).catch(e => {
                            console.log(e);
                        });
                    }
                });
            })
            .catch(e => {
                return console.log(e)
            });

    } else if (checkIfLoggedIn()) {
        window.location.href = 'account.html';
    }
}

function emailLogin() {
    if (!checkIfLoggedIn()) {
        const email = document.querySelector('#email-input-login').value;
        const password = document.querySelector('#password-input-login').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(e => {
                console.log(e);
            })

    } else if (checkIfLoggedIn()) {
        window.location.href = 'account.html';
    }
}

function googleSignUp() {
    if (!checkIfLoggedIn()) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(() => {
                window.location.href = 'account.html';
            })
            .catch(e => {
                console.log(e);
            })
    } else if (checkIfLoggedIn()) {
        window.location.href = 'account.html';
    }
}

function signOut() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch(e => {
            console.log(e);
        });
}

