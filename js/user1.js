



const message = document.getElementById("message-input");
const sender_btn = document.getElementById("sender-btn");

const chat = document.getElementById("messages");






const message_sender = () => {
        let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();

    let time = `${hour}:${minutes} AM`;
    
    if (now.getHours() > 12) {
        hour -= 12;
        time = `${hour}:${minutes} PM`;
    }

    


    if (message.value.trim() !== "") {


        chat.innerHTML += `
        <div class="message-row sent">
          <div class="bubble-wrap">
            <div class="bubble">${message.value.trim()}</div><span class="time">${time} <b
                class="ticks">✓✓</b></span>
          </div>
        </div>`


        message.value = '';

    }

}


sender_btn.addEventListener("click", message_sender);
document.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        message_sender();
    }
});