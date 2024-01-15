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
  room_name=localStorage.getItem("room_name");

  function logout(){
    window.location.replace("index.html");
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
  }

  function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("msg").value="";
  }

  function getData(){
    firebase.database().ref("/"+room_name).on('value',function(snapshot){document.getElementById("output").innerHTML="";snapshot.forEach(function(childSnapshot){childkey=childSnapshot.key;childData=childSnapshot.val();if(childkey!="purpose"){
      firebase_message_id=childkey;
      message_data=childData;
      console.log(firebase_message_id);
      console.log(message_data);
      name=message_data['name'];
      message=message_data['message'];
      like=message_data['like'];
      nameWithtag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
      messageWithtag="<h4 class='message_h4'>"+message+"</h4>";
      likebutton="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      spanWithtag="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>";
      row=nameWithtag+messageWithtag+likebutton+spanWithtag;
      document.getElementById("output").innerHTML+=row;

    }});});
  }

  getData();

function updateLike(message_id){
  console.log("Clicked on the Like Button - "+message_id);
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  updated_likes=Number(likes)+1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({
    like:updated_likes
  });
}