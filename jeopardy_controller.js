//BROADCAST
const self_id = "ctr";
const cox = new BroadcastChannel("Jeopardy_Cox");

cox.onmessage = (event) => {
    const {from, to, payload} = event.data;
    if (to.includes(self_id)) {
        console.log(`from "${from}": ${payload}`);
        eval(payload)
    }
}

function signal(receiver, content){
    cox.postMessage({from: self_id, to: receiver, payload: content})
    console.log(`to "${receiver}": ${content}`);
}

// const jc = new BroadcastChannel("Jeopardy_Channel");
// const js = new BroadcastChannel("Jeopardy_Service");

// jc.onmessage = (event) => {
//     console.log("[BC]: " + event.data);
//     eval(event.data);
// };

// function message(content) {
//     console.log("[BC]> " + content);
//     jc.postMessage(content);
// }

// function setUp(name_list, color_list){
//     for (let i = 0; i <= 5; i++){
//         document.getElementById(name_list[i]).innerHTML = boldify(name_list)
//     }
// }

//UTILITY
function boldify(text) {
    return `<b>${text}</b>`;
}

var Player =  {
    name(id, name) {
        document.getElementById(`player_head${id}`).innerHTML = boldify(name);
    },

    color(id, color) {
        document.getElementById(`player_tab${id}`).style.backgroundColor = color;
    },

    toggle(id) {
        let player = document.getElementById(`player_tab${id}`);
        if (player.style.display == "none") {
            player.style.display = "grid";
        }
        else {
            player.style.display = "none";
        }
    },

    active(id) {
        let player = document.getElementById(`player${id}`);
        
    },

    // set(id, value) {
    //     document.getElementById(`playerCounter${id}`).innerHTML = boldify(value)
    // },

    // score(id, value) {
    //     document.getElementById(`playerCounter${id}`).innerHTML = `` + boldify(parseInt(document.getElementById(`playerCounter${id}`).innerHTML.replace("<b>","").replace("</b>", "")) + parseInt(value));
    // },

    // clear(id) {
    //     document.getElementById(`playerCounter${id}`).innerHTML = 0;
    //     document.getElementById(`playerName${id}`).innerHTML = "Player";
    //     document.getElementById(`player${id}`).style.backgroundColor = "rgb(45, 45, 45)";
    // },

    // zero(id){
    //     document.getElementById(`playerCounter${id}`).innerHTML = 0;
    // },

    // fastSet() {
    //     Player.name(0, "Avocasio");
    //     Player.color(0, "green");
    //     Player.name(1, "Kula");
    //     Player.color(1, "rgb(50, 100, 200)");
    //     Player.name(2, "Prism");
    //     Player.color(2, "purple");
    //     Player.name(3, "Bianchi");
    //     Player.color(3, "darkred");
    // }
}

var Points = {
    remove(id) {
        let qnt = parseInt(document.getElementById("prize").value);
        signal(["jeo"], `Player.score(${id}, -${qnt})`);
        //console.log(`Player ${id}: -${qnt}$`);
        //message(`Player.score(${id}, -${qnt})`);
    },

    set(id){
        let qnt = parseInt(document.getElementById("prize").value);
        signal(["jeo"], `Player.set(${id}, ${qnt})`);
        //console.log(`Player ${id}: ${qnt}$`);
        //message(`Player.set(${id}, ${qnt})`);
    },
    
    add(id){
        let qnt = parseInt(document.getElementById("prize").value);
        signal(["jeo"], `Player.score(${id}, ${qnt})`);
        //console.log(`Player ${id}: +${qnt}$`);
        //message(`Player.score(${id}, ${qnt})`);
    }
}