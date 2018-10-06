let totalVotes = 0;
document.getElementById('candidatesVotes').innerHTML += '';
firebase.database().ref().on("value", function(snapshot) {
  let fillVotesNumber = Object.keys(snapshot.val());
  fillVotesNumber.forEach((candidate) => {
    let candidateObject = snapshot.val()[candidate];
    totalVotes = totalVotes + parseInt(candidateObject.votos);
  })
  fillVotesNumber.forEach((candidate) => {
    let candidateObject = snapshot.val()[candidate];
    percent = (parseInt(candidateObject.votos)/totalVotes)*100;
    document.getElementById('candidatesVotes').innerHTML += `
      <div class="row">
        <p class="col-md-5" >${candidateObject.nombre}</p>
        <input id=${candidate+'votes'} value=${candidateObject.votos} class="col-md-1"/>
        <button id=${candidate} class="btn btn-warning btnCandidate">Actualizar</button>
        <p class="col-md-3" >${percent} %</p>
      </div>
    `;
  })
  let btnsCandidate = document.getElementsByClassName("btnCandidate");
  for(let i = 0; i < btnsCandidate.length; i++) {
    ((index) => {
      btnsCandidate[index].addEventListener("click", function() {
         let votesCounter = document.getElementById(btnsCandidate[index].id+'votes').value;
         if(typeof(parseInt(votesCounter)) === 'number' && parseInt(votesCounter)>=0) {
           firebase.database().ref().child(btnsCandidate[index].id).update({
             votos: votesCounter,
             porcentaje: (votesCounter/totalVotes)*100
           })
           document.getElementById('candidatesVotes').innerHTML += '';
           window.location.reload(true);
         } else {
           alert('Ingrese un numero valido mayor a 0')
         }
       })
    })(i);
  }
});

document.getElementById('generateFirstPlace').addEventListener('click', ()=> {
  document.getElementById('orderCandidates').innerHTML += '';
  let messyListCandidate = [];
  firebase.database().ref().on("value", function(snapshot) {
    let getVotesNumber = Object.keys(snapshot.val());
    getVotesNumber.forEach((candidate) => {
      let candidateObject = snapshot.val()[candidate];
      messyListCandidate.push(candidateObject);

    })
    messyListCandidate.sort( function(a,b) {
      return a.porcentaje - b.porcentaje;
    });
    messyListCandidate = messyListCandidate.reverse();
    messyListCandidate.forEach(element => {
      document.getElementById('orderCandidates').innerHTML += `
        <div class="row">
          <p class="col-md-5" >${element.nombre}</p>
          <p class="col-md-3" >${element.porcentaje} %</p>
        </div>
      `;
    })
  });
})
