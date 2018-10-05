document.getElementById('loginUser').addEventListener('click', () => {
  let email = document.getElementById('emailUser').value;
  let password = document.getElementById('passwordUser').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    document.getElementById('messageError').innerHTML = "";
    let user = firebase.auth().currentUser;
    console.log(user.uid);
    firebase.database().ref().child('candidato11').update({
      votos: 220
    })
  })
  .catch(function (error) {
    var errorMessage = error.message;
    document.getElementById('messageError').style.color = 'red';
    document.getElementById('messageError').innerHTML = "Usuario no existe o la contraseña no coincide.";
    console.log;
  });
});
