function getPasswords() {
    const db = firebase.firestore();
    const myPasswords = db.collection('pwds');

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            myPasswords.where('userID', '==', user.uid).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        renderPasswords(doc.data(), doc.data().password.length);
                    });
                }).catch(e => {
                console.log(e);
            });
        }
    });
}

function savePassword() {
    const name = document.querySelector('#name-input-account').value;
    const password = document.querySelector('#password-input-account').value;

    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    db.collection('pwds').add({
        userID: user.uid,
        name: name,
        password: password
    })
        // .then(() => {
        //     getPasswords();
        // })
        .catch(e => {
            console.log(e);
        })
}

function renderPasswords(data, length) {
    let str;
    for (let i = 0; i < length; i++) {
        str += '•';
    }

    const random = Math.random().toString(36).slice(-8);
    const randomString = `ID${random}`;

    const paraName = document.createElement('P');
    const tName = document.createTextNode(data.name);
    paraName.setAttribute('class', 'name');
    paraName.appendChild(tName);
    document.querySelector('#pass-left').appendChild(paraName);

    const paraPass = document.createElement('P');
    const tPass = document.createTextNode(str.replace('undefined', ''));
    paraPass.setAttribute('class', 'pass');
    paraPass.setAttribute('id', randomString);
    paraPass.setAttribute('name', data.password);
    paraPass.appendChild(tPass);
    document.querySelector('#pass-right').appendChild(paraPass);
}

function changeView() {
    if (document.querySelector('#show-btn').name === 'show') {
        let x = document.querySelector('#pass-right').querySelectorAll('.pass');
        for (let i = 0; i < x.length; i++) {
            document.querySelector(`#${x[i].attributes[1].value}`).innerText = x[i].attributes[2].value;
        }
        document.querySelector('#show-btn').name = 'hide';
        document.querySelector('#show-btn').innerText = 'Hide Passwords';
    } else if (document.querySelector('#show-btn').name === 'hide') {
        let x = document.querySelector('#pass-right').querySelectorAll('.pass');
        for (let i = 0; i < x.length; i++) {
            let str;
            for (let j = 0; j < x[i].attributes[2].value.length; j++) {
                str += '•';
            }
            document.querySelector(`#${x[i].attributes[1].value}`).innerText = str.replace('undefined', '');
        }
        document.querySelector('#show-btn').name = 'show';
        document.querySelector('#show-btn').innerText = 'Show Passwords';
    }
}

function refreshOnLoad() {
    let passElement = document.querySelector('#pass-right');
    let nameElement = document.querySelector('#pass-left');

    // console.log(nameElement.attributes[0].childNodes.length);
    // console.log(nameElement.attributes[0].childNodes.length);

    passElement.innerHTML = '';
    nameElement.innerHTML = '';
}

function refreshOnAction() {
    let passElement = document.querySelector('#pass-right');
    passElement.innerHTML = '';

    let nameElement = document.querySelector('#pass-left');
    nameElement.innerHTML = '';

    getPasswords();
}