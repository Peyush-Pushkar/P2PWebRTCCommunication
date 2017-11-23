var isNode = typeof module !== 'undefined';
if (isNode) {
    // Create new global vars.
    WebSocket = require('ws');
    RTCPeerConnection = require('../lib/RTCPeerConnection');
    RTCSessionDescription = require('../lib/RTCSessionDescription');
    RTCIceCandidate = require('../lib/RTCIceCandidate');
}
var server = { urls: "stun:stun.l.google.com:19302" };

var dc, pc = new RTCPeerConnection({ iceServers: [server] });
pc.onaddstream = e => v2.srcObject = e.stream;
pc.oniceconnectionstatechange = e => log(pc.iceConnectionState);

var haveMedia = navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => pc.addStream(v1.srcObject = stream)).catch(log);

function createOffer() {
    button.disabled = true;
    haveMedia.then(() => pc.createOffer()).then(d => pc.setLocalDescription(d))
        .catch(log);
    pc.onicecandidate = e => {
        if (e.candidate) return;
        offer.value = pc.localDescription.sdp;
        //offer.css('width',((offer.value.length + 1)* 8)+'px')
        offer.select();
        answer.placeholder = "Paste answer here";
    };
};

function CreateAnswer(value) {
    var desc = new RTCSessionDescription({ type: "offer", sdp: offer.value });
    pc.setRemoteDescription(desc)
        .then(() => pc.createAnswer()).then(d => pc.setLocalDescription(d))
        .catch(log);
    pc.onicecandidate = e => {
        if (e.candidate) return;
        answer.focus();
        answer.value = pc.localDescription.sdp;
        answer.select();
    };
};

function connnectToPeer(value) {
    var desc = new RTCSessionDescription({ type: "answer", sdp: value });
    pc.setRemoteDescription(desc).catch(log);
};

var log = msg => div.innerHTML += "<p>" + msg + "</p>";

var placeholder = document.getElementById("offer");
console.log(placeholder);


