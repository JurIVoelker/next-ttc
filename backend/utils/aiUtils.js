const generalInfo =
  "Du schreibst für einen Tischtennisverein, namens TTC Klingenmünster. Der Verein hat eine eigene Zeitung, die Südpfalzkurier. Die Zeitung berichtet über Tischtennis, den Verein und die Region Klingenmünster in der Südpfalz. Der Verein hat eine eigene Website, die ttc-klingenmuenster.de heißt. Die Zeitung soll informativ und ansprechend sein, mit einem Fokus auf lokale Ereignisse und Tischtennis-Themen. Der Text soll nicht übertrieben enthusiastisch sein.";
const returnRequirements =
  'Gebe den Text im JSON-Format zurück, ohne zusätzliche Informationen oder Erklärungen und ohne Markdownformatierung. Format: { "text": "<text>", "title": "<title>" }';

const makeAiRequest = async ({ userMessage, task }) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.DEEPSEEK_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "system",
            content: `Du bist ein KI-Assistent, der Texte für Zeitungsartikel generiert. 
            Schreibeanweisung: ${generalInfo} 
            Rückgabeformat: ${returnRequirements}
            
            Dabei beachte die folgende Anweisung: ${task}`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  let content = data.choices[0].message.content;
  if (content.startsWith("```json") && content.endsWith("```")) {
    content = content.slice(7, -3).trim();
  }
  return content;
};

module.exports = {
  makeAiRequest,
};
