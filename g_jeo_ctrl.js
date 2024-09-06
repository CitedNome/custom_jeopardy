const jc = new BroadcastChannel("Jeopardy_Channel");

jc.onmessage = (event) => {
    //console.log(event);
    eval(event.data);
};

function message(content) {
    jc.postMessage(content);
}

function loadPrize(value) {
    document.getElementById("prize").value = value;
}

var Player = {
    name(id){
        let name = document.getElementById(`name${id}`).value;
        jc.postMessage(`Player.name(${id}, "${name}")`);
        document.getElementById(`player_head${id}`).innerHTML = name;
    },
    color(id) {
        let color = document.getElementById(`color${id}`).value;
        jc.postMessage(`Player.color(${id}, "${color}")`);
        document.getElementById(`player_tab${id}`).style.backgroundColor = color;
    },

    toggle(id) {
        jc.postMessage(`Player.toggle(${id})`);
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
        jc.postMessage(`loadBoard(${id})`);
    }
}

var Points = {
    remove(id) {
        let qnt = parseInt(document.getElementById("prize").value);
        //console.log(`Player ${id}: -${qnt}$`);
        jc.postMessage(`Player.score(${id}, -${qnt})`);
    },

    set(id){
        let qnt = parseInt(document.getElementById("prize").value);
        //console.log(`Player ${id}: ${qnt}$`);
        jc.postMessage(`Player.set(${id}, ${qnt})`);
    },
    
    add(id){
        let qnt = parseInt(document.getElementById("prize").value);
        //console.log(`Player ${id}: +${qnt}$`);
        jc.postMessage(`Player.score(${id}, ${qnt})`);
    }
}