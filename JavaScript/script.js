window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
            document.getElementById("loader");

        if(loader){
            loader.style.display = "none";
        }

    }, 1500);

});

// ============================
// DARK MODE
// ============================

const themeBtn =
    document.getElementById("themeBtn");

if(themeBtn){

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle(
            "dark-mode"
        );

    });

}

// ============================
// SOS ALERT
// ============================

function activateSOS(){

    alert(
        "🚨 EMERGENCY SOS ACTIVATED!\n\nLocation sharing started."
    );

    if(navigator.vibrate){

        navigator.vibrate([
            300,
            100,
            300,
            100,
            500
        ]);

    }

    getLocation();

}

// ============================
// LIVE LOCATION
// ============================

function getLocation(){

    const locationText =
        document.getElementById("location");

    if(!navigator.geolocation){

        locationText.innerHTML =
            "Geolocation not supported.";

        return;
    }

    locationText.innerHTML =
        "Fetching location...";

    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;

            locationText.innerHTML =

            `
            Latitude: ${lat}<br>
            Longitude: ${lng}<br><br>

            <a href="
            https://www.google.com/maps?q=${lat},${lng}
            " target="_blank">

            Open in Google Maps

            </a>
            `;

        },

        error => {

            locationText.innerHTML =
                "Unable to get location.";

        }

    );

}

// ============================
// ANIMATED COUNTER
// ============================

let usersCount =
    document.getElementById("usersCount");

if(usersCount){

    let count = 0;

    const interval = setInterval(() => {

        count += 50;

        usersCount.innerText = count;

        if(count >= 5000){

            clearInterval(interval);

        }

    }, 20);

}

// ============================
// AI CHATBOT
// ============================

function sendMessage(){

    const input =
        document.getElementById("userInput");

    const chatBox =
        document.getElementById("chatBox");

    if(!input || !chatBox)
        return;

    let userText =
        input.value.trim();

    if(userText === "")
        return;

    let botResponse = "";

    const text =
        userText.toLowerCase();

    if(text.includes("followed")){

        botResponse =
        "Move to a crowded area and call emergency services.";

    }

    else if(text.includes("unsafe")){

        botResponse =
        "Share your location with trusted contacts immediately.";

    }

    else if(text.includes("help")){

        botResponse =
        "Press the SOS button and contact emergency services.";

    }

    else if(text.includes("police")){

        botResponse =
        "Police Emergency Number: 100";

    }

    else if(text.includes("women helpline")){

        botResponse =
        "Women Helpline Number: 181";

    }

    else{

        botResponse =
        "Stay calm and prioritize your safety. Contact trusted people nearby.";

    }

    chatBox.innerHTML +=
    `
    <div>
        <b>You:</b> ${userText}
    </div>

    <div style="margin-bottom:15px;">
        <b>SafeHer AI:</b> ${botResponse}
    </div>
    `;

    chatBox.scrollTop =
        chatBox.scrollHeight;

    input.value = "";

}

// ============================
// SIREN ALARM
// ============================

let sirenRunning = false;

function playSiren(){

    if(sirenRunning)
        return;

    sirenRunning = true;

    const audioContext =
        new(window.AudioContext ||
             window.webkitAudioContext)();

    let oscillator =
        audioContext.createOscillator();

    oscillator.type = "square";

    oscillator.frequency.value = 900;

    oscillator.connect(
        audioContext.destination
    );

    oscillator.start();

    setTimeout(() => {

        oscillator.stop();

        sirenRunning = false;

    }, 3000);

}

// ============================
// FAKE CALL FEATURE
// ============================

function fakeCall(){

    setTimeout(() => {

        const answer =
            confirm(
                "📞 Incoming Call\n\nMom Calling..."
            );

        if(answer){

            alert(
                "Call Connected."
            );

        }

    }, 3000);

}

// ============================
// EMERGENCY CONTACTS
// ============================

function saveContact(){

    const name =
        prompt("Enter Contact Name");

    const phone =
        prompt("Enter Contact Number");

    if(!name || !phone)
        return;

    let contacts =

        JSON.parse(
            localStorage.getItem(
                "safeher_contacts"
            )
        ) || [];

    contacts.push({

        name,
        phone

    });

    localStorage.setItem(

        "safeher_contacts",

        JSON.stringify(
            contacts
        )

    );

    alert(
        "Contact Saved Successfully!"
    );

}

function viewContacts(){

    let contacts =

        JSON.parse(
            localStorage.getItem(
                "safeher_contacts"
            )
        ) || [];

    if(contacts.length === 0){

        alert(
            "No contacts saved."
        );

        return;
    }

    let output = "";

    contacts.forEach(c => {

        output +=
        `${c.name} - ${c.phone}\n`;

    });

    alert(output);

}

// ============================
// VOICE SOS
// ============================

function startVoiceSOS(){

    if(!('webkitSpeechRecognition'
        in window)){

        alert(
            "Voice recognition not supported."
        );

        return;
    }

    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = event => {

        const text =

            event.results[0][0]
            .transcript
            .toLowerCase();

        if(

            text.includes("help") ||
            text.includes("emergency") ||
            text.includes("save me")

        ){

            activateSOS();

        }

    };

}

// ============================
// QUICK CALLS
// ============================

function callPolice(){

    window.location.href =
        "tel:100";

}

function callWomenHelpline(){

    window.location.href =
        "tel:181";

}

function callAmbulance(){

    window.location.href =
        "tel:108";

}
