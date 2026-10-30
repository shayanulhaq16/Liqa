
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
            if (payload.new.sender_id === "ayaan") {
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
    // It bring you on last msg
    chat.scrollTop = chat.scrollHeight;
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
            sender_id: "mira",
            receiver_id: "ayaan",
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

        chat.innerHTML = `<div class="date-pill">TODAY</div>
        <div class="encryption-note">🔒 Messages are private between you and Ayaan.</div>`;
        for (const element of data) {


            const date = new Date(element.created_at);
            const time = date.toLocaleTimeString("en-PK", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            });

            if (element.sender_id === "mira") {
                chat.innerHTML += `<div class="message-row sent">
          <div class="bubble-wrap">
            <div class="bubble">${element.msg}</div><span class="time">${time} <b
                class="ticks">✓✓</b></span>
          </div>
        </div>`
            }
            else if (element.sender_id === "ayaan") {
                chat.innerHTML += `<div class="message-row received">
          <div class="mini-avatar">A</div>
          <div class="bubble-wrap">
            <div class="bubble">${element.msg}</div><span class="time">${time}</span>
          </div>
        </div>`
            }
        }

        // It bring you on last msg
        chat.scrollTop = chat.scrollHeight;
    }



}

previous_msg();



