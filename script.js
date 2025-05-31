const API_KEY = "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";

const content = document.getElementById("content");
const chatInp = document.getElementById("Chat-Input");
const sendButton = document.getElementById("Send-Button");
let isAnswerLoading = false;
let AnswerSectionId = 0;

sendButton.addEventListener('click', () => handlesendmessage());
chatInp.addEventListener('keypress', (event) =>{
  if (event.key === 'Enter') {
    handlesendmessage();
  }
}); 

function handlesendmessage() {
      const question = chatInp.value.trim();
    if (question === "" || isAnswerLoading)  return;
      
       sendButton.classList.add('send-Button-nonactive');
      addQuestionSection(question);
      chatInp.value = ""; 
    }

function getAnswer(question) {
  
const fetchData =
     fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`, 
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-r1-distill-llama-70b:free",
    "messages": [
      {
        "role": "user",
        "content": question
      }
    ]
  })
});

fetchData.then(response => response.json())
  .then(data => {
   const resultData = data.choices[0].message.content;
   isAnswerLoading = false;
   addAnswerSection(resultData);

    
  })
  .catch(error => {
    console.error("Error:", error);
    
  })
  .finally(() => {
    scrollToBottom();
    sendButton.classList.remove('send-Button-nonactive');
  });
}


function addQuestionSection(messsage) {
    isAnswerLoading = true;
    const SectionElement = document.createElement("section");
    SectionElement.className = "Ques-Section";
    SectionElement.textContent = messsage;

    content.appendChild(SectionElement);
    addAnswerSection(messsage);
    scrollToBottom();
}

function addAnswerSection(messsage) {
    if (isAnswerLoading) {
    AnswerSectionId++;
    const SectionElement = document.createElement("section");
    SectionElement.className = "Answer-section";
    SectionElement.innerHTML = getLoadingsvg();
    SectionElement.id = AnswerSectionId;


    content.appendChild(SectionElement);
    getAnswer(messsage);
    } else{
         const answerSectionElement = document.getElementById('AnswerSectionId');
         answerSectionElement.textContent = messsage;
    }
 
}

function getLoadingsvg() {
   return `<svg style="height:18px; width :18px;"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4A90E2" stroke="#4A90E2" stroke-width="4" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="0.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4A90E2" stroke="#4A90E2" stroke-width="4" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="0.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4A90E2" stroke="#4A90E2" stroke-width="4" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="0.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>`
}

function scrollToBottom() {
  content.scrollTo({
    top: content.scrollHeight,
    behavior: 'smooth'
  })
}

