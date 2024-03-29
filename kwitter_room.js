
var firebaseConfig = {
      apiKey: "AIzaSyDrqIPq5fFJ3ihnMMUUzeXcIvFBSRGrc94",
      authDomain: "kwitter-8dfb8.firebaseapp.com",
      databaseURL: "https://kwitter-8dfb8-default-rtdb.firebaseio.com",
      projectId: "kwitter-8dfb8",
      storageBucket: "kwitter-8dfb8.appspot.com",
      messagingSenderId: "657239345827",
      appId: "1:657239345827:web:7c2e219baed58810224d16"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="welcome"+user_name+"!";
    function addRoom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"Adding room name"
      });
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
    }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("room_name - "+Room_names);
      row="<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;

      //End code
      });});}
getData();
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
