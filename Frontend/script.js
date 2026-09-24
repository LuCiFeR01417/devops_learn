const BACKEND_URL = "http://localhost:3000";


// --------------------------------
// GET /api/health
// --------------------------------

async function checkBackend() {

    try {

        const response = await fetch(
            `${BACKEND_URL}/api/health`
        );

        const data = await response.json();


        document.getElementById(
            "backendStatus"
        ).textContent = data.message;


    } catch (error) {

        document.getElementById(
            "backendStatus"
        ).textContent = "Backend Offline";

    }

}


// --------------------------------
// GET /api/tips
// --------------------------------

async function getSecurityTips() {

    try {

        const response = await fetch(
            `${BACKEND_URL}/api/tips`
        );


        const data = await response.json();


        displayTips(data.tips);


    } catch (error) {

        console.error(
            "Error loading tips:",
            error
        );

    }

}


// --------------------------------
// Display tips
// --------------------------------

function displayTips(tips) {

    const container =
        document.getElementById(
            "tipsContainer"
        );


    container.innerHTML = "";


    tips.forEach((tip) => {

        const card =
            document.createElement("div");


        card.className = "tip";


        const title =
            document.createElement("h3");

        title.textContent =
            tip.title;


        const description =
            document.createElement("p");

        description.textContent =
            tip.description;


        const category =
            document.createElement("small");

        category.textContent =
            `Category: ${tip.category}`;


        // Edit button

        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";


        editButton.addEventListener(
            "click",
            () => editTip(tip)
        );


        // Delete button

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener(
            "click",
            () => deleteTip(tip.id)
        );


        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(category);

        card.appendChild(
            document.createElement("br")
        );

        card.appendChild(editButton);

        card.appendChild(deleteButton);


        container.appendChild(card);

    });

}


// --------------------------------
// POST /api/tips
// --------------------------------

async function addTip(event) {

    event.preventDefault();


    const title =
        document.getElementById(
            "title"
        ).value;


    const description =
        document.getElementById(
            "description"
        ).value;


    const category =
        document.getElementById(
            "category"
        ).value;


    const response = await fetch(
        `${BACKEND_URL}/api/tips`,
        {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                title: title,

                description: description,

                category: category

            })

        }
    );


    const data =
        await response.json();


    console.log(data);


    document.getElementById(
        "tipForm"
    ).reset();


    getSecurityTips();

}


// --------------------------------
// PUT /api/tips/:id
// --------------------------------

async function editTip(tip) {

    const newTitle =
        prompt(
            "Enter new title:",
            tip.title
        );


    if (newTitle === null) {
        return;
    }


    const newDescription =
        prompt(
            "Enter new description:",
            tip.description
        );


    if (newDescription === null) {
        return;
    }


    const newCategory =
        prompt(
            "Enter new category:",
            tip.category
        );


    if (newCategory === null) {
        return;
    }


    const response = await fetch(

        `${BACKEND_URL}/api/tips/${tip.id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                title: newTitle,

                description: newDescription,

                category: newCategory

            })

        }

    );


    const data =
        await response.json();


    console.log(data);


    getSecurityTips();

}


// --------------------------------
// DELETE /api/tips/:id
// --------------------------------

async function deleteTip(id) {

    const confirmed =
        confirm(
            "Delete this security tip?"
        );


    if (!confirmed) {
        return;
    }


    const response = await fetch(

        `${BACKEND_URL}/api/tips/${id}`,

        {

            method: "DELETE"

        }

    );


    const data =
        await response.json();


    console.log(data);


    getSecurityTips();

}


// --------------------------------
// Event listeners
// --------------------------------

document
    .getElementById("tipForm")
    .addEventListener(
        "submit",
        addTip
    );


document
    .getElementById("refreshButton")
    .addEventListener(
        "click",
        getSecurityTips
    );


// --------------------------------
// Initial page load - test
// --------------------------------

checkBackend();
getSecurityTips();