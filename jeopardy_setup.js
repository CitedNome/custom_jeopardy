//BROADCAST
const self_id = "set";
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

// js.onmessage = (event) => {
    // console.log("[BC]: " + event.data);
    // // eval(event.data);
// };

// jc.onmessage = (event) => {
    // console.log("[BC]: " + event.data);
    // eval(event.data);
// };

// function message(content) {
    // console.log("[BC]> " + content);
    // jc.postMessage(content);
// }

// function transmit() {
    // var players_names = [document.getElementById(`player_tab0`).style.backgroundColor, document.getElementById(`player_tab1`).style.backgroundColor, document.getElementById(`player_tab2`).style.backgroundColor, document.getElementById(`player_tab3`).style.backgroundColor, document.getElementById(`player_tab4`).style.backgroundColor];
    // var players_colors = [document.getElementById(`player_head0`).innerHTML, document.getElementById(`player_head1`).innerHTML, document.getElementById(`player_head2`).innerHTML, document.getElementById(`player_head3`).innerHTML, document.getElementById(`player_head4`).innerHTML];
    // console.log("[BS]> Data transmitted to controller");
    // js.postMessage(`setUp(${players_names}, ${players_colors})`);
// }

//UTILITY
function loadPrize(value) {
    document.getElementById("prize").value = value;
}

//HANDLERS
var Player = {
    name(id){
        let name = document.getElementById(`name${id}`).value;
        signal(["jeo", "ctr"], `Player.name(${id}, "${name}")`);
        //message(`Player.name(${id}, "${name}")`);
        document.getElementById(`player_head${id}`).innerHTML = name;
    },
    color(id) {
        let color = document.getElementById(`color${id}`).value;
        signal(["jeo", "ctr"], `Player.color(${id}, "${color}")`);
        //message(`Player.color(${id}, "${color}")`);
        document.getElementById(`player_tab${id}`).style.backgroundColor = color;
    },
    toggle(id) {
        signal(["jeo", "ctr"], `Player.toggle(${id})`);
        //message(`Player.toggle(${id})`);
        let cover = document.getElementById(`cover${id}`);
        if (cover.style.visibility == "visible") {
            cover.style.visibility = "hidden";
        }
        else {
            cover.style.visibility = "visible";
        }
    }
}

var Board = {
    load(id) {
        signal(["jeo"], `Board.load(${id})`);
        //message(`Board.load(${id})`);
    },

    bg(id) {
        signal(["jeo"], `Board.bg(${id})`);
        //message(`Board.bg(${id})`);

    }
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