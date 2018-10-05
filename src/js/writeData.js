document.getElementById('loginUser').addEventListener('click', () => {
  let email = document.getElementById('emailUser').value;
  let password = document.getElementById('passwordUser').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    document.getElementById('messageError').innerHTML = "";
    let user = firebase.auth().currentUser;
    console.log(user.uid);
    document.getElementById('generalView').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';

    document.getElementById('adminView').style.display = 'block';
    let totalVotes = 0;
    firebase.database().ref().on("value", function(snapshot) {
      let fillVotesNumber = Object.keys(snapshot.val());
      fillVotesNumber.forEach((candidate) => {
        let candidateObject = snapshot.val()[candidate];
        totalVotes = totalVotes + candidateObject.votos;
        console.log(candidateObject.nombre)
        document.getElementById('candidatesVotes').innerHTML += `
          <div class="row">
            <p class="col-md-5" >${candidateObject.nombre}</p>
            <input id=${candidate+'votes'} value=${candidateObject.votos} class="col-md-1"/>
            <button id=${candidate} class="btn btn-warning">Actualizar</button>
          </div>
        `;
      })
      console.log(Object.keys(snapshot.val()));

    });
  })
  .catch(function (error) {
    var errorMessage = error.message;
    document.getElementById('messageError').style.color = 'red';
    document.getElementById('messageError').innerHTML = "Usuario no existe o la contraseña no coincide.";
    console.log;
  });
});
firebase.database().ref().child('candidato10').update({
  votos: 2280
})
document.getElementById('adminView').style.display = 'none';
