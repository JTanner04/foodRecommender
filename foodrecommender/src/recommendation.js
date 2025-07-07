import './recommendation.css';

export default function Recommendation() {
    async function getRecommendations() {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer <API_KEY>",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
                "messages": [
                    {
                        "role": "user",
                        "content": "Just recommend one fast food restaruant in my city. My city is " + localStorage.getItem('city') + "."
                    }
                ]
            })
        });
        const data = await response.json();
        console.log(data);

        let recommendation = "No recommendation found.";
        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            recommendation = data.choices[0].message.content;
        } else if (data.error) {
            recommendation = "Error: " + data.error.message;
        }
        document.getElementById('recommendation').innerText = recommendation;
    }

    return (
        <div className="recommendation">
            <h1>Food Recommendations</h1>
            <button onClick={getRecommendations}>Get Recommendations</button>
            <p id="recommendation"></p>
        </div>
    );
}
