const firebaseConfig = {
    apiKey: "AIzaSyDM0ZQzXad6p2TI5ai3XiedwIz3ABUMkLY",
    authDomain: "chat-app-7798b.firebaseapp.com",
    projectId: "chat-app-7798b",
    storageBucket: "chat-app-7798b.appspot.com",
    messagingSenderId: "302912236",
    appId: "1:302912236:web:aa3ce30fa4acba4b474bc9",
    measurementId: "G-J18T7G45WV"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics()
  const userImage='https://conferenceoeh.com/wp-content/uploads/profile-dummy-girl.jpg'
  const db = firebase.firestore();
//add-message
  var form = document.querySelector('#enterMessage');
  form.addEventListener('submit',function (e){
    e.preventDefault();
    console.log(form.message.value);
    let message_value=form.message.value;
    let date=new Date();
    // let date_value=date.getHours()+':'+date.getMinutes()+'|'+date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()
    let date_value=`${date.getHours()}:${date.getMinutes()}|${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    db.collection("users").add({
       message:message_value,
       user_name:'Jacob John',
       user_image:userImage,
       date:date_value
    })
    .then((docRef) => {
        let message_obj={
            message:message_value,
            user_name:'Jacob John',
            user_image:userImage,
            date:date_value
        }
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  })

  var chatSection=document.querySelector('.chat-section');

getMessages();
  function getMessages(){
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().message}`);
            addMessageChat(doc.data())
        });
    });
    
  }

  function addMessageChat(message){
    //creating required elements
 let user_image=document.createElement('img');
 let user_name=document.createElement('h5');
 let message_element=document.createElement('p');
 let date=document.createElement('small');
 let chat_wrapper=document.createElement('div');
 let single_chat=document.createElement('div')

//adding values to the created elements
 user_image.src=message.userImage;
 message_element.innerText = message.message;
 user_name.innerText=message.user_name;
 date.innerText=message.date

 //adding classes
 user_image.classList.add('avatar');
 chat_wrapper.classList.add('message-details');
 single_chat.classList.add('single-chat')

//appending child elements
 chat_wrapper.append(user_name);
 chat_wrapper.append(message_element);
chat_wrapper.append(date);


single_chat.append(chat_wrapper)
single_chat.append(user_image)

chatSection.append(single_chat)

 
  }