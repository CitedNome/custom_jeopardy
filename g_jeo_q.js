//TABELLONI QUIZ VARI
// > 0 = text, 1 = img
var genshin1 = [
    [[0, "Qual è il nome, ispirato all'Ars Goetia, dell'Archon Dendro?"],[0, "Quali sono i tre personaggi che hanno un parry come skill?"],[0, "Un personaggio che non tocca mai la propria arma."],[0, "Chi scrive per un giornale di Fontaine noto in tutta Teyvat?"],[0, "Quante sono le divinità giocabili?"]],
    [[0, "Nomina almeno due delle Hypostasis"],[0, "Quale spada 5★ può curare i personaggi appena vengono feriti?"],[0, "Chi ha scritto il libro 'Teyvat Travel Guide'?"],[0, "Di che colore sono gli occhi di Glory?"],[0, "Qual è il nome della sorella maggiore della dr. Edith?"]],
    [[0, "Qual è il nome della biblioteca dell'Akademiya?"],[0, "Qual è il nome della locanda di Diluc?"],[0, "Dove si trova il corpo di Durin?"],[0, "Nomina almeno due dei luoghi in cui si può trovare una 'Divine Nail'"],[0, "Dove avviene il primo contatto tra Nahida e Traveler?"]],
    [[0, "Qual è il vero nome di Fischl?"], [0, "Quali personaggi giocabili fanno parte del Clan Gunnhildr?"], [0, "Chi strozzò a morte involontariamente un mostro che tentava di mangiarl*?"], [0, "Chi ricopre il ruolo di Grand Master of the Knights of Favonius?"], [0,"Chi scrive lettere a Lisa per imparare ad usare parole nuove?"]],
    [[0, "Quanta Masterless Starglitter è necessaria per comprare un personaggio?"], [0, "Qual'era il motto della miHoYo?"], [0, "Quali personaggi giocabili hanno fatto una apparizione su Honkai Impact 3rd?"], [0,"Quando si celebra l'anniversario del gioco?"], [0, "Quante Masterless Stardust costerebbe un wish senza lo sconto?"]],
    ["Personaggi", "Random", "Luoghi", "Lore", "Genshin"]
]

var genshin2 = [
    [[1, "immagini/genshin/namecards/bennett_namecard.webp"], [1, "immagini/genshin/namecards/rosaria_namecard.webp"], [1, "immagini/genshin/namecards/ayato_namecard.webp"], [1, "immagini/genshin/namecards/noelle_namecard.webp"], [1, "immagini/genshin/namecards/albedo_namecard.webp"]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    ["Namecards", "", "", "", ""]
]

var gog = [
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    [[0, ], [0, ], [0, ], [0, ], [0, ]],
    ["Gog 1", "Gog 2", "Gog 3", "Gog 4", "Gog 5"]
]

//HANDLER CONNESSIONI
const jc = new BroadcastChannel("Jeopardy_Channel");

jc.onmessage = (event) => {
    //console.log(event);
    eval(event.data)
};

//PRESET QUIZ GENSHIN
var jSet = null;
loadBoard(2);

//QUIZ
function triggerCell(cat, cell) {
    //console.log("["+cat+cell+"] "+jSet[cat][cell][1]);

    let dmc = jSet[cat][cell][0];
    let td = document.getElementById("td_" + cat + cell);
    let dmd = document.getElementById("domandaDiv");

    //Ripristina
    if(td.style.backgroundColor == "rgb(49, 48, 48)"){//Gray
        td.style.backgroundColor = "rgb(5, 5, 194)";//Blue
        return
    }
    //Disattiva
    else {
        td.style.backgroundColor = "rgb(49, 48, 48)";//Gray
        //Invia Valore Domanda al Controller
        jc.postMessage(`loadPrize(${(cell + 1) * 200})`)
        //Domanda Testo
        if (dmc == 0) {
            dmd.innerHTML = `<h2 id="domandaTesto">${jSet[cat][cell][1]}</h2>`;
        }
        //Domanda Immagine
        else if (dmc == 1){
            dmd.innerHTML = `<img id="domandaImg" src="${jSet[cat][cell][1]}">`;
        }
        showQuest();
    }
}

function showQuest() {
    //Quest Div
    document.getElementById("domandaDiv").style.visibility = "visible";
    document.getElementById("domandaDiv").style.opacity = "100%";
    //Black Div
    document.getElementById("cover").style.visibility = "visible";
    document.getElementById("cover").style.opacity = "75%";
}

function hideQuest() {
    //Quest Div
    document.getElementById("domandaDiv").style.opacity = "0%";
    document.getElementById("domandaDiv").style.visibility = "hidden";
    //Black Div
    document.getElementById("cover").style.opacity = "0%";
    document.getElementById("cover").style.visibility = "hidden";
}

//UTILITY
function boldify(text) {
    return `<b>${text}</b>`;
}

//CONSOLE COMMANDS (HANDLER PER CONNESSIONI)
var Player =  {
    name(id, name) {
        document.getElementById(`playerName${id}`).innerHTML = "" + name;
    },

    color(id, color) {
        document.getElementById(`player${id}`).style.backgroundColor = color;
    },

    toggle(id) {
        let player = document.getElementById(`player${id}`);
        if (player.style.display == "none") {
            player.style.display = "flex";
        }
        else {
            player.style.display = "none";
        }
    },

    active(id) {
        let player = document.getElementById(`player${id}`);
        
    },

    set(id, value) {
        document.getElementById(`playerCounter${id}`).innerHTML = boldify(value)
    },

    score(id, value) {
        document.getElementById(`playerCounter${id}`).innerHTML = `` + boldify(parseInt(document.getElementById(`playerCounter${id}`).innerHTML.replace("<b>","").replace("</b>", "")) + parseInt(value));
    },

    clear(id) {
        document.getElementById(`playerCounter${id}`).innerHTML = 0;
        document.getElementById(`playerName${id}`).innerHTML = "Player";
        document.getElementById(`player${id}`).style.backgroundColor = "rgb(45, 45, 45)";
    },

    zero(id){
        document.getElementById(`playerCounter${id}`).innerHTML = 0;
    },

    fastSet() {
        Player.name(0, "Avocasio");
        Player.color(0, "green");
        Player.name(1, "Kula");
        Player.color(1, "rgb(50, 100, 200)");
        Player.name(2, "Prism");
        Player.color(2, "purple");
        Player.name(3, "Bianchi");
        Player.color(3, "darkred");
    }
}

function loadBoard(id){
    if (id==0) {
        jSet = genshin1;
    }
    if (id==1) {
        jSet = genshin2;
    }
    if (id==2) {
        jSet = gog;
    }

    for (let i=0; i<5; i++) {
        document.getElementById("th"+i).innerHTML = jSet[5][i]
    }
}

function help(){
    console.log('>loadQuest(id): load a different set of questions on the main board\n-->id: 0 = "genshin1", 1 = "genshin2" ...\n>Player\n-->set(id, name color): set <name> & <color> of <id> player\n-->score(id, value): give +<value> points to <id> player\n-->clear(id): resets <id> player to default\n-->zero(id): set <id> player\'s points to 0')
}