class Ticket {
    constructor(id, guests) {
        this.id = id;
        this.guests = guests;
    }
}

class TicketingSystem {
    constructor() {
        this.ticketCounter = 1;
        this.tickets = {};
    }

    generateUniqueId() {
        return 'T' + this.ticketCounter++;
    }

    generateTicket(numGuests) {
        const guests = [];
        let totalCharge = 0;

        for (let i = 0; i < numGuests; i++) {
            const guestAge = parseInt(prompt(`Enter age for guest ${i + 1}:`));
            let charge;

            if (guestAge <= 2) {
                charge = 0;
            } else if (guestAge < 18) {
                charge = 100;
            } else if (guestAge < 60) {
                charge = 500;
            } else {
                charge = 300;
            }

            guests.push({ guestNo: i + 1, age: guestAge });
            totalCharge += charge;
        }

        const ticketId = this.generateUniqueId();
        const ticket = new Ticket(ticketId, guests);
        this.tickets[ticketId] = ticket;
        return ticket;
    }

    validateTicket(ticketId) {
        const ticket = this.tickets[ticketId];
        if (ticket) {
            return ticket;
        } else {
            return null;
        }
    }
}

const ticketingSystem = new TicketingSystem();

document.getElementById('generateBtn').addEventListener('click', () => {
    const numGuests = parseInt(document.getElementById('numGuests').value);
    const ticket = ticketingSystem.generateTicket(numGuests);
    displayTicket(ticket);
});

document.getElementById('validateBtn').addEventListener('click', () => {
    const ticketId = document.getElementById('ticketId').value;
    const ticket = ticketingSystem.validateTicket(ticketId);
    if (ticket) {
        displayValidationResult(ticket);
    } else {
        document.getElementById('validationResult').textContent = `Invalid ticket ID.`;
    }
});

function displayTicket(ticket) {
    let ticketHtml = '<h3>Ticket Details:</h3>';
    ticketHtml += `<p>Ticket ID: ${ticket.id}</p>`;
    ticketHtml += `<p>Number of Guests: ${ticket.guests.length}</p>`;
    ticketHtml += '<p>Guest Details:</p>';
    ticketHtml += '<ul>';
    ticket.guests.forEach(guest => {
        ticketHtml += `<li>Guest ${guest.guestNo} - Age: ${guest.age}</li>`;
    });
    ticketHtml += '</ul>';
    document.getElementById('ticketResult').innerHTML = ticketHtml;
}

function displayValidationResult(ticket) {
    let validationResult = '<h3>Ticket Details:</h3>';
    validationResult += `<p>Ticket ID: ${ticket.id}</p>`;
    validationResult += `<p>Number of Guests: ${ticket.guests.length}</p>`;
    validationResult += '<p>Guest Details:</p>';
    validationResult += '<ul>';
    ticket.guests.forEach(guest => {
        validationResult += `<li>Guest ${guest.guestNo} - Age: ${guest.age}</li>`;
    });
    validationResult += '</ul>';
    document.getElementById('validationResult').innerHTML = validationResult;
}
