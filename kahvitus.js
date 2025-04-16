function getKey(date, time) {
    return `${date}-${time}`;
}

function ilmoitaKahvi() {
    const date = document.getElementById('paivamaara').value;
    if (document.getElementById('aamukahvi').checked) {
        const key = getKey(date, 'aamu');
        let count = parseInt(localStorage.getItem(key) || 0);
        localStorage.setItem(key, count + 1);
    }
    if (document.getElementById('iltakahvi').checked) {
        const key = getKey(date, 'ilta');
        let count = parseInt(localStorage.getItem(key) || 0);
        localStorage.setItem(key, count + 1);
    }
}

function avaaKeittaja() {
    document.getElementById('kahvittelija').style.display = 'none';
    document.getElementById('keittaja').style.display = 'block';
    paivitaKeittajanNaytto();
}

function avaaKahvittelija() {
    document.getElementById('keittaja').style.display = 'none';
    document.getElementById('kahvittelija').style.display = 'block';
    paivitaStatusit();
}



function paivitaKeittajanNaytto() {
    const date = document.getElementById('paivamaara-keittaja').value;
    const aamuKey = getKey(date, 'aamu');
    const iltaKey = getKey(date, 'ilta');
    document.getElementById('aamu-maara').innerText = localStorage.getItem(aamuKey) || 0;
    document.getElementById('ilta-maara').innerText = localStorage.getItem(iltaKey) || 0;
    paivitaKeitettyStatus(date);
}

function keitetty(type) {
    const date = document.getElementById('paivamaara-keittaja').value;
    const statusKey = getKey(date, `keitetty-${type}`);
    localStorage.setItem(statusKey, '1');
    paivitaKeitettyStatus(date);
}

function paivitaKeitettyStatus(date) {
    ['aamu', 'ilta'].forEach(type => {
        const key = getKey(date, `keitetty-${type}`);
        const keitetty = localStorage.getItem(key) === '1';
        const el1 = document.getElementById(`${type}-status`);
        const el2 = document.getElementById(`${type}-status-keittaja`);
        if (el1) el1.className = 'status ' + (keitetty ? 'green' : 'red');
        if (el2) el2.className = 'status ' + (keitetty ? 'green' : 'red');   
    });
}

function paivitaStatusit() {
    const date = document.getElementById('paivamaara').value;
    paivitaKeitettyStatus(date);
}

function nollaaKahvit() {
    const date = document.getElementById('paivamaara-keittaja').value;
    ['aamu', 'ilta'].forEach(type => {
        const key = getKey(date, type);
        localStorage.removeItem(key);
        const statusKey = getKey(date, `keitetty-${type}`);
        localStorage.removeItem(statusKey);
    });
    paivitaKeittajanNaytto();
    paivitaStatusit();
}

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const paivamaaraInput = document.getElementById('paivamaara');
    const paivamaaraKeittajaInput = document.getElementById('paivamaara-keittaja');

    paivamaaraInput.value = today;
    paivamaaraInput.setAttribute('value', today);

    paivamaaraKeittajaInput.value = today;
    paivamaaraKeittajaInput.setAttribute('value', today);

    paivitaStatusit();
    paivitaKeittajanNaytto();
});