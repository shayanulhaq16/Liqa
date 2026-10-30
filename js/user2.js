import supabase from "./credentail.js";



const message = document.getElementById("message-input");
const sender_btn = document.getElementById("sender-btn");

const chat = document.getElementById("messages");


const channel = supabase
    .channel('chat-test')
    .on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'messages'
        },
        (payload) => {

            if (payload.new.sender_id === "user1") {

                const date = new Date(payload.new.created_at);
                const time = date.toLocaleTimeString("en-PK", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                });

                chat.innerHTML += `
                <div class="message-row received">
                <div class="mini-avatar">A</div>
                <div class="bubble-wrap">
                <div class="bubble">${payload.new.msg}</div><span class="time">${time}</span>
                </div>
                </div>`
            }
        }
    )
    .subscribe();



const message_sender = async () => {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();

    let time = `${hour}:${minutes} AM`;

    if (now.getHours() > 12) {
        hour -= 12;
        time = `${hour}:${minutes} PM`;
    }




    if (message.value.trim() !== "") {



        let obj = {
            sender_id: "user2",
            receiver_id: "user1",
            msg: message.value.trim()
        }

        const { error } = await supabase
            .from('messages')
            .insert(obj)

        console.log(error);


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
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        message_sender();
    }
});


const previous_msg = async () => {

    const { data, error } = await supabase
        .from('messages')
        .select()


    if (!error) {

        chat.innerHTML = "";
        for (const element of data) {


            const date = new Date(element.created_at);
            const time = date.toLocaleTimeString("en-PK", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            });

            if (element.sender_id === "user2") {
                chat.innerHTML += `<div class="message-row sent">
          <div class="bubble-wrap">
            <div class="bubble">${element.msg}</div><span class="time">${time} <b
                class="ticks">✓✓</b></span>
          </div>
        </div>`
            }
            else {
                chat.innerHTML += `<div class="message-row received">
          <div class="mini-avatar">A</div>
          <div class="bubble-wrap">
            <div class="bubble">${element.msg}</div><span class="time">${time}</span>
          </div>
        </div>`
            }
        }

    }


}

previous_msg();


window.onload = () => {
    let composer_area = document.querySelector(".composer-area");
    window.scrollTo({
        top: composer_area.scrollHeight,
        behavior: 'smooth'
    })
}