const fetch = require('node-fetch');
const { useEmailer } = require("./emailer.js")
require("dotenv").config({ path: "./config/.env" });
const key = process.env.OPEN_AI_KEY;
async function getRecommendations(hair, problems, goals, email, userName) {
    const correctProblems = typeof problems == "string" ? problems : problems.join(", ");
    const correctGoals = typeof goals == "string" ? goals : goals.join(", ");

    const prompt = `Pretend you are a curly hair specialist. 
    Create a personalized email for ${userName} containing hair recommendations for ${hair} hair type that solves for ${correctProblems} and promotes ${correctGoals}. Your emails tone should be friendly, and detailed. Your recommendation should include suggested hair routine, and hair products. Please use html tags to format your email.`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.5,
        model: "text-davinci-003"
      })
    };

    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    const data = await response.json();
    const personalizedEmail = data.choices[0].text;
    useEmailer(personalizedEmail, email, userName)
  } 

  module.exports = { getRecommendations } 
