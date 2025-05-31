const API_KEY = "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";

const chatInp = document.getElementById("Chat-Input");
const sendButton = document.getElementById("Send-Button");
sendButton.addEventListener('click', () => handlesendmessage());

function handlesendmessage() {
      const question = chatInp.value.trim();
      console.log("Question:", question);
    }

const fetchData =
     fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`, // Replace with your OpenRouter API key
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-r1-distill-llama-70b:free",
    "messages": [
      {
        "role": "user",
        "content": "Inroduce yourself."
      }
    ]
  })
});

// fetchData.then(response => response.json())
//   .then(data => {
//     console.log("Response:", data.choices[0].message.content);
    
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });

