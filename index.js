const rechargeDisplay = document.getElementById("recharge");
const network = document.getElementById("network");
const amt = document.getElementById("amount");
const cardTableList = document.getElementById("tableBody");
const cardSummaryList = [];

generate.addEventListener('click', () => rechargeDisplay.value = Math.random().toString().slice(2, 12));

save.addEventListener('click', () => {
    if (network.value != "" && amt.value != "" && rechargeDisplay.value != "") {
        const cardObject = {
            name: network.value,
            amount: amt.value,
            pin: rechargeDisplay.value,
            rechargeCode() {
                if (this.name === "MTN") return `*555*${this.pin}#`;
                if (this.name === "Glo") return `*123*${this.pin}#`;
                if (this.name === "Airtel") return `*126*${this.pin}#`;
                if (this.name === "9Mobile") return `*236*${this.pin}#`;
            },
            checkStatus: "Not Used",
            dateCreated: new Date().toLocaleDateString(),
            dateUsed: "Not yet used"
        };
        cardSummaryList.push(cardObject);
        displayList();
    } else {
        alert("Fill the three Inputs");
    }
});

rechargeButton.addEventListener('click', () => {
    const recharge = document.getElementById("rechargeButton");
    const index = cardSummaryList.findIndex(function (element) {
        return element.rechargeCode() === pinInput.value.trim();
    });
    
    if (index !== -1) {
        if (cardSummaryList[index].checkStatus === "Used") {
            alert("Card has been used");
        }
        else {
            cardSummaryList[index].checkStatus = "Used";
            cardSummaryList[index].dateUsed = new Date().toLocaleDateString();
            alert("Recharge Succesful!");
        }
    } else {
        alert("Invalid Card Pin");
    }
    displayList();
    pinInput.value = "";
});

function displayList() {
    cardTableList.innerHTML = "";
    cardSummaryList.forEach((card, index) => {
        const tr = document.createElement("tr");
        tr.className = "bg-blue-50 shadow";
        tr.innerHTML = `<th class="text-left px-4 py-1 rounded-l-lg">${index + 1}</th>
            <td class="text-left px-4 py-1">${card.name}</td>
            <td class="text-left px-4 py-1">${card.amount}</td>
            <td class="text-left px-4 py-1">${card.pin}</td>
            <td class="text-left px-4 py-1">${card.rechargeCode()}</td>
            <td class="text-left px-4 py-1">${card.checkStatus}</td>
            <td class="text-left px-4 py-1">${card.dateCreated}</td>
            <td class="text-left px-4 py-1">${card.dateUsed}</td>
            <td class="text-left px-4 py-1 rounded-r-lg"><button onclick="deleteCard(${index})" class="p-2 bg-red-800 text-white rounded-lg ">Delete</button></td>
        `;
        cardTableList.appendChild(tr);
        network.value = "";
        amt.value = "";
        rechargeDisplay.value = "";
    });
}

function deleteCard(index) {
    cardSummaryList.splice(index, 1);
    displayList();
}