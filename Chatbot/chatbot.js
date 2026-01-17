
const chatWidget = document.getElementById("chatWidget");
const chatToggle = document.getElementById("chatToggle");
const closeChat = document.getElementById("closeChat");

let chatStarted = false;
chatToggle.addEventListener("click", () => {
    chatWidget.classList.remove("hidden");
    chatToggle.style.display = "none";

    if (!chatStarted) {
        startChat();
        chatStarted = true;
    }
});

closeChat.addEventListener("click", () => {
    chatWidget.classList.add("hidden");
    chatToggle.style.display = "flex";
});


const careerTracks = [
    {
        id: 1,
        title: "Track 1: Tech & Digital",
        subtitle: "(Software, IT, Data, AI, Coding)",
        salary: "3L - 6L",
        reality: "The learning never stops. You will spend hours debugging code. If you stop studying for 6 months, you become outdated.",
        questions: [
            "I love solving logical puzzles and finding errors.",
            "I am comfortable sitting in front of a laptop screen for 8-10 hours a day.",
            "When I don't know an answer, my first instinct is to Google it immediately.",
            "I prefer working with machines, code, and data rather than managing people."
        ]
    },
    {
        id: 2,
        title: "Track 2: Sales & Business",
        subtitle: "(BDE, Corporate Sales, Retail)",
        salary: "2.5L - 5L (+ Incentives)",
        reality: "You will face rejection 10 times a day. High pressure, but the fastest way to earn big money without a tech degree.",
        questions: [
            "I have high energy and find it easy to talk to strangers.",
            "I am money-motivated and get excited by 'Incentives' and 'Bonuses'.",
            "I have thick skin—I don't get sad or offended if someone says 'No' to me.",
            "I hate the idea of sitting quietly at a desk all day; I want action."
        ]
    },
    {
        id: 3,
        title: "Track 3: Marketing & Content",
        subtitle: "(Digital Marketing, Social Media, Design)",
        salary: "2.5L - 4.5L",
        reality: "It is not just 'posting reels.' It involves data analysis, constant deadlines, and high creativity on demand.",
        questions: [
            "I spend a lot of time on social media observing trends, ads, and viral content.",
            "I have a good eye for design, colors, visuals, or storytelling.",
            "I enjoy experimenting with tools like Canva, AI (ChatGPT), or Video Editors.",
            "I get bored easily by repetitive data entry or strict rules."
        ]
    },
    {
        id: 4,
        title: "Track 4: Finance & Banking",
        subtitle: "(Accounts, Audit, Banking Ops)",
        salary: "3L - 5L",
        reality: "Accuracy is 100% required. One small mistake can cause big financial issues. Stable but repetitive.",
        questions: [
            "I am good with numbers, calculations, and spotting errors.",
            "I hate chaos; I like organizing things and making sure processes run smoothly.",
            "I like following clear rules, regulations, and structured processes.",
            "I enjoy working with Excel sheets, balances, and reports."
        ]
    },
    {
        id: 5,
        title: "Track 5: Healthcare & Pharma",
        subtitle: "(Pharma Sales, Medical Coding)",
        salary: "2.5L - 5L",
        reality: "Sales involves travel/doctor visits. Ops requires strict adherence to medical laws and long hours of focus.",
        questions: [
            "I have a science background and understand basic medical terminology.",
            "I want a meaningful career that contributes to patient health.",
            "I have a sharp memory for difficult names (medicines/procedures).",
            "I am disciplined about following hygiene, safety, and compliance rules."
        ]
    },
    {
        id: 6,
        title: "Track 6: Operations & Logistics",
        subtitle: "(Supply Chain, Warehouse, Backend)",
        salary: "3L - 5L",
        reality: "High responsibility. If a delivery is late or stock is missing, it is your problem to solve immediately.",
        questions: [
            "I am disciplined, organized, and very detail-oriented.",
            "I am good at planning, scheduling, and coordinating between people.",
            "I stay calm in stressful situations when things go wrong.",
            "I prefer 'executing' tasks behind the scenes rather than selling upfront."
        ]
    },
    {
        id: 7,
        title: "Track 7: Customer Support",
        subtitle: "(BPO, Client Success)",
        salary: "2L - 4L",
        reality: "You must follow a script. Work is repetitive. Best place to build communication skills for 1-2 years.",
        questions: [
            "I am patient and polite, even when the other person is angry.",
            "I want to start earning quickly while I figure out my long-term plan.",
            "I have decent English speaking or typing skills.",
            "I can handle complaints without taking them personally."
        ]
    },
    {
        id: 8,
        title: "Track 8: Core Engineering",
        subtitle: "(Civil, Mechanical, Electrical)",
        salary: "3L - 5L",
        reality: "Entry-level jobs often involve heat, dust, and hard labor. It is not an AC office job.",
        questions: [
            "I like getting my hands dirty and working in the real physical world.",
            "I want to work in the specific technical field I studied for.",
            "I understand how physical systems, machines, or structures work.",
            "I am willing to work in non-metro locations, sites, or factory floors."
        ]
    }
];

/* --- LOGIC VARIABLES --- */
let currentStep = -1;
let userScores = new Array(careerTracks.length).fill(0);
const chatBody = document.getElementById('chatBody');
const inputArea = document.getElementById('inputArea');

/* --- FUNCTIONS --- */

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addMessage(text, type, isHtml = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', type === 'bot' ? 'bot-msg' : 'user-msg');
    isHtml ? msgDiv.innerHTML = text : msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    scrollToBottom();
}

function showTyping() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'bot-msg');
    msgDiv.id = id;
    msgDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    chatBody.appendChild(msgDiv);
    scrollToBottom();
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function startChat() {
    const typingId = showTyping();
    setTimeout(() => {
        removeTyping(typingId);
        addMessage("Hello! I am the Safalta Sarathi Career Assistant. 🎓", 'bot');
        setTimeout(() => {
            addMessage("I'm here to help you find your ideal career path using our 30-Day Career Reset Matrix.", 'bot');
            setTimeout(() => {
                addMessage("I will show you different career tracks. Check the boxes that are <b>TRUE</b> for you. Ready?", 'bot', true);
                inputArea.innerHTML = `<button class="action-btn" onclick="nextStep()">Yes, Let's Start!</button>`;
            }, 800);
        }, 800);
    }, 1000);
}

function nextStep() {
    currentStep++;
    if (currentStep < careerTracks.length) askTrackQuestions(currentStep);
    else showResults();
}

function askTrackQuestions(index) {
    const track = careerTracks[index];
    const typingId = showTyping();
    inputArea.innerHTML = '';
    setTimeout(() => {
        removeTyping(typingId);
        addMessage(`Let's look at <b>${track.title}</b>.`, 'bot', true);
        setTimeout(() => {
            addMessage("Tick the statements below that describe you:", 'bot');
            renderCheckboxes(index);
        }, 500);
    }, 800);
}

function renderCheckboxes(trackIndex) {
    const track = careerTracks[trackIndex];
    let html = `<div class="checkbox-group">`;
    track.questions.forEach((q, i) => {
        html += `
        <div class="checkbox-item">
            <input type="checkbox" id="q-${i}">
            <label for="q-${i}">${q}</label>
        </div>`;
    });
    html += `</div><button class="action-btn" onclick="submitAnswers(${trackIndex})">Next Section ➔</button>`;
    inputArea.innerHTML = html;
}

function submitAnswers(trackIndex) {
    const score = inputArea.querySelectorAll('input:checked').length;
    userScores[trackIndex] = score;
    addMessage(score === 0 ? "None of these match me." : `${score} ticks.`, 'user');
    nextStep();
}

function showResults() {
    const typingId = showTyping();
    inputArea.innerHTML = '';
    setTimeout(() => {
        removeTyping(typingId);
        addMessage("Analysis complete! Calculating your results... 📊", 'bot');
        setTimeout(() => {
            const maxScore = Math.max(...userScores);
            const matches = careerTracks.filter((_, i) => userScores[i] === maxScore && maxScore > 0);
            matches.forEach(match => {
                addMessage(`
                <div class="result-card">
                    <div class="result-title">${match.title}</div>
                    <div>${match.subtitle}</div>
                    <div class="result-salary">💰 ${match.salary}</div>
                    <div class="result-reality"><b>Reality Check:</b> ${match.reality}</div>
                </div>`, 'bot', true);
            });
            inputArea.innerHTML = `<button class="action-btn reset-btn" onclick="location.reload()">Start Over ⟳</button>`;
        }, 1500);
    }, 1000);
}

