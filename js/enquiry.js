/* =====================================
   DURA ROOF ENQUIRY SYSTEM
===================================== */

const openBtn = document.getElementById("openEnquiry");
const closeBtn = document.getElementById("closeEnquiry");
const modal = document.getElementById("enquiryModal");
const form = document.getElementById("enquiryForm");

const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE";

// Popup Open
openBtn.addEventListener("click", function(e){
    e.preventDefault();
    modal.classList.add("active");
});

// Popup Close
closeBtn.addEventListener("click", function(){
    modal.classList.remove("active");
});

// Outside Click Close
window.addEventListener("click", function(e){
    if(e.target === modal){
        modal.classList.remove("active");
    }
});

// Submit Form
form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        district: document.getElementById("district").value,
        product: document.getElementById("product").value,
        message: document.getElementById("message").value.trim()
    };

    // Validation
    if(data.name === ""){
        alert("Enter your name");
        return;
    }

    if(!/^[0-9]{10}$/.test(data.phone)){
        alert("Enter a valid 10 digit mobile number");
        return;
    }

    try{

        // Google Sheets
        if(SCRIPT_URL !== "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE"){

            await fetch(SCRIPT_URL,{
                method:"POST",
                mode:"no-cors",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            });

        }

    }catch(err){
        console.log(err);
    }

    // WhatsApp Message
    const whatsappMessage =
`🏠 *New Dura Roof Enquiry*

👤 Name : ${data.name}
📞 Phone : ${data.phone}
📍 District : ${data.district}
🏗 Product : ${data.product}

💬 Message :
${data.message}

🌐 Website:
https://sanju-codes.github.io/Dura/`;

    const url =
"https://wa.me/919947502447?text=" +
encodeURIComponent(whatsappMessage);

    // Success
    alert("Thank you! Your enquiry has been submitted.");

    form.reset();

    modal.classList.remove("active");

    // Open WhatsApp
    window.open(url,"_blank");

});
