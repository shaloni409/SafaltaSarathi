const careerData = [
            // TRACK 1
            { track: "TRACK 1: TECH & DIGITAL", text: "I love solving logical puzzles and finding errors." },
            { track: "TRACK 1: TECH & DIGITAL", text: "I am comfortable sitting in front of a laptop for 8-10 hours." },
            { track: "TRACK 1: TECH & DIGITAL", text: "When I don't know an answer, I Google it immediately." },
            { track: "TRACK 1: TECH & DIGITAL", text: "I prefer working with machines/code rather than people." },

            // TRACK 2
            { track: "TRACK 2: SALES & BUSINESS", text: "I have high energy and find it easy to talk to strangers." },
            { track: "TRACK 2: SALES & BUSINESS", text: "I am money-motivated and excited by 'Incentives'." },
            { track: "TRACK 2: SALES & BUSINESS", text: "I have thick skin—I don't get sad if someone says 'No'." },
            { track: "TRACK 2: SALES & BUSINESS", text: "I hate sitting quietly; I want action." },

            // TRACK 3
            { track: "TRACK 3: MARKETING & CONTENT", text: "I observe social media trends, ads, and viral content closely." },
            { track: "TRACK 3: MARKETING & CONTENT", text: "I have a good eye for design, colors, visuals, or storytelling." },
            { track: "TRACK 3: MARKETING & CONTENT", text: "I enjoy experimenting with tools like Canva or AI." },
            { track: "TRACK 3: MARKETING & CONTENT", text: "I get bored easily by repetitive data entry." },

            // TRACK 4
            { track: "TRACK 4: FINANCE & BANKING", text: "I am good with numbers, calculations, and spotting errors." },
            { track: "TRACK 4: FINANCE & BANKING", text: "I like following clear rules and structured processes." },
            { track: "TRACK 4: FINANCE & BANKING", text: "I enjoy working with Excel sheets, balances, and reports." },
            { track: "TRACK 4: FINANCE & BANKING", text: "I am disciplined, organized, and very detail-oriented." },

            // TRACK 5
            { track: "TRACK 5: HEALTHCARE & PHARMA", text: "I have a science background and understand medical terms." },
            { track: "TRACK 5: HEALTHCARE & PHARMA", text: "I want a meaningful career contributing to patient health." },
            { track: "TRACK 5: HEALTHCARE & PHARMA", text: "I have a sharp memory for difficult names/medicines." },
            { track: "TRACK 5: HEALTHCARE & PHARMA", text: "I am disciplined about hygiene and safety rules." },

            // TRACK 6
            { track: "TRACK 6: OPERATIONS & LOGISTICS", text: "I hate chaos; I like organizing things perfectly." },
            { track: "TRACK 6: OPERATIONS & LOGISTICS", text: "I am good at planning, scheduling, and coordinating." },
            { track: "TRACK 6: OPERATIONS & LOGISTICS", text: "I stay calm in stressful situations when things go wrong." },
            { track: "TRACK 6: OPERATIONS & LOGISTICS", text: "I prefer 'executing' tasks behind the scenes." },

            // TRACK 7
            { track: "TRACK 7: CUSTOMER SUPPORT", text: "I am patient and polite, even when others are angry." },
            { track: "TRACK 7: CUSTOMER SUPPORT", text: "I want to start earning quickly (Short-term goal)." },
            { track: "TRACK 7: CUSTOMER SUPPORT", text: "I have decent English speaking or typing skills." },
            { track: "TRACK 7: CUSTOMER SUPPORT", text: "I can handle complaints without taking them personally." },

            // TRACK 8
            { track: "TRACK 8: CORE ENGINEERING", text: "I like getting my hands dirty working in the physical world." },
            { track: "TRACK 8: CORE ENGINEERING", text: "I want to work in the specific technical field I studied." },
            { track: "TRACK 8: CORE ENGINEERING", text: "I understand how physical systems or machines work." },
            { track: "TRACK 8: CORE ENGINEERING", text: "I am willing to work in non-metro sites or factories." }
        ];

        const trackDetails = {
            "TRACK 1: TECH & DIGITAL": { role: "Software, IT, Data, AI", salary: "3L - 6L", reality: "Constant learning required. Hours of debugging." },
            "TRACK 2: SALES & BUSINESS": { role: "BDE, Corp Sales, Retail", salary: "2.5L - 5L (+ Incentives)", reality: "High rejection rate. High pressure, high reward." },
            "TRACK 3: MARKETING & CONTENT": { role: "Digital Mkt, Design, Writing", salary: "2.5L - 4.5L", reality: "Constant deadlines. Portfolio matters more than degree." },
            "TRACK 4: FINANCE & BANKING": { role: "Accounts, Audit, Banking", salary: "3L - 5L", reality: "Accuracy is 100% required. Work is stable but repetitive." },
            "TRACK 5: HEALTHCARE & PHARMA": { role: "Pharma Sales, Coding", salary: "2.5L - 5L", reality: "Requires long focus and strict adherence to laws." },
            "TRACK 6: OPERATIONS & LOGISTICS": { role: "Supply Chain, Warehouse", salary: "3L - 5L", reality: "High responsibility. If delivery is late, it's your problem." },
            "TRACK 7: CUSTOMER SUPPORT": { role: "BPO, Client Success", salary: "2L - 4L", reality: "Repetitive script work. Great for building communication skills." },
            "TRACK 8: CORE ENGINEERING": { role: "Civil, Mech, Electrical", salary: "3L - 5L", reality: "Heat, dust, hard labor initially. Very stable later." }
        };

        let isLoaded = false;
        let welcomeShown = false; 

        function toggleSafaltaBot() {
            const sidebar = document.getElementById('ssSidebar');
            const backdrop = document.getElementById('ssBackdrop');
            const isActive = sidebar.classList.contains('active');

            if (isActive) {
                sidebar.classList.remove('active');
                backdrop.classList.remove('active');
            } else {
                sidebar.classList.add('active');
                backdrop.classList.add('active');
                
                // Trigger welcome sequence ONLY on first open
                if (!welcomeShown) {
                    welcomeShown = true;
                    runWelcomeSequence();
                } 
            }
        }

        // --- NEW HELPER FUNCTIONS FOR TYPING ---

        function showTypingDelay(ms) {
            return new Promise(resolve => {
                const chatBody = document.getElementById('ssChatBody');
                const thinkingMsg = document.createElement('div');
                thinkingMsg.className = 'ss-msg ss-msg-bot';
                thinkingMsg.id = 'ssTypingBubble'; 
                thinkingMsg.innerHTML = `
                    <div class="ss-typing-dots">
                        <div class="ss-dot"></div>
                        <div class="ss-dot"></div>
                        <div class="ss-dot"></div>
                    </div>
                `;
                chatBody.appendChild(thinkingMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
                
                setTimeout(() => {
                    if(thinkingMsg) thinkingMsg.remove();
                    resolve();
                }, ms);
            });
        }

        function addBotMessage(htmlContent) {
            const chatBody = document.getElementById('ssChatBody');
            const botMsg = document.createElement('div');
            botMsg.className = 'ss-msg ss-msg-bot';
            botMsg.innerHTML = htmlContent;
            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        async function runWelcomeSequence() {
             // 1. First Message (Namaste)
             await showTypingDelay(1000); 
             addBotMessage('<strong>Namaste! 🙏</strong><br>Welcome to the Safalta Sarathi Career Assistant.');

             // 2. Second Message (Intro)
             await showTypingDelay(1200); 
             addBotMessage('I can help you select the ideal career track for the next 1-2 years using our <strong>Career Clarity Matrix</strong>.');

             // 3. Third Message (Instruction)
             await showTypingDelay(1200); 
             addBotMessage('When you are ready, click the button below to start the assessment.');

             // 4. AFTER instruction, SHOW "LET'S START" BUTTON
             document.getElementById('ssStartBtn').style.display = 'block';
             
             setTimeout(() => {
                document.getElementById('ssChatBody').scrollTop = document.getElementById('ssChatBody').scrollHeight;
             }, 50);
        }

        function startQuestionnaire() {
            // SWITCH VIEW: Hide Chat, Show Checklist Page
            document.getElementById('ssChatBody').style.display = 'none';
            document.getElementById('ssChecklistPage').style.display = 'block';

            // BUTTONS: Hide Start, Show Find Path
            document.getElementById('ssStartBtn').style.display = 'none';
            document.getElementById('ssSubmitBtn').style.display = 'block';

            // Load items if not loaded
            if(!isLoaded) loadQuestions();
        }

        // ----------------------------------------

        function loadQuestions() {
            const container = document.getElementById('ssChecklistItems');
            container.innerHTML = "";
            
            careerData.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'ss-checkbox-item';
                
                div.innerHTML = `
                    <input type="checkbox" id="q${index}" value="${item.track}">
                    <label for="q${index}">${item.text}</label>
                `;
                
                const cb = div.querySelector('input');

                // Custom Click Handler
                div.onclick = (e) => {
                    // If clicked anywhere except the checkbox itself, toggle the checkbox manually
                    if (e.target !== cb) {
                        cb.checked = !cb.checked;
                    }
                    
                    // Toggle Visual Class based on checkbox state
                    if (cb.checked) {
                        div.classList.add('selected');
                    } else {
                        div.classList.remove('selected');
                    }
                };

                container.appendChild(div);
            });
            isLoaded = true;
        }

        function calculateCareerPath() {
            const checkedBoxes = document.querySelectorAll('#ssChecklistItems input:checked');
            
            if (checkedBoxes.length === 0) {
                alert("Please select at least one option!");
                return;
            }

            // SWITCH VIEW BACK: Hide Checklist, Show Chat
            document.getElementById('ssChecklistPage').style.display = 'none';
            document.getElementById('ssChatBody').style.display = 'flex';
            
            // HIDE SUBMIT BTN
            document.getElementById('ssSubmitBtn').style.display = 'none';

            // Tally votes
            const scores = {};
            checkedBoxes.forEach(box => {
                scores[box.value] = (scores[box.value] || 0) + 1;
            });

            // Find winner
            let bestTrack = "";
            let highestScore = 0;

            for (const [track, score] of Object.entries(scores)) {
                if (score > highestScore) {
                    highestScore = score;
                    bestTrack = track;
                }
            }

            displayResults(bestTrack, highestScore);
        }

        function displayResults(track, score) {
            const chatBody = document.getElementById('ssChatBody');
            const details = trackDetails[track];

            // 1. User Message (We simulate this appearing now)
            const userMsg = document.createElement('div');
            userMsg.className = 'ss-msg ss-msg-user';
            userMsg.innerText = "I've selected my preferences. What is my path?";
            chatBody.appendChild(userMsg);
            chatBody.scrollTop = chatBody.scrollHeight;

            // 2. SHOW THINKING BUBBLE 
            const thinkingMsg = document.createElement('div');
            thinkingMsg.className = 'ss-msg ss-msg-bot';
            thinkingMsg.id = 'ssThinkingBubble'; 
            thinkingMsg.innerHTML = `
                <div class="ss-typing-dots">
                    <div class="ss-dot"></div>
                    <div class="ss-dot"></div>
                    <div class="ss-dot"></div>
                </div>
            `;
            chatBody.appendChild(thinkingMsg);
            chatBody.scrollTop = chatBody.scrollHeight;

            // 3. WAIT 2 SECONDS, THEN SHOW RESULT
            setTimeout(() => {
                // A. Remove thinking bubble
                const bubble = document.getElementById('ssThinkingBubble');
                if(bubble) bubble.remove();

                // B. Add Bot Result
                const botMsg = document.createElement('div');
                botMsg.className = 'ss-msg ss-msg-bot';
                
                botMsg.innerHTML = `
                    <strong>Analysis Complete! 🎯</strong><br>
                    You ticked <strong>${score}</strong> boxes for this section.<br><br>
                    Your recommended path is:<br>
                    <div class="ss-result-card">
                        <div class="ss-result-header">${track}</div>
                        <div class="ss-result-details">
                            <strong>Roles:</strong> ${details.role}<br>
                            <strong>Avg Salary:</strong> ${details.salary}<br>
                            <hr style="border:0; border-top:1px solid #ccc; margin:8px 0;">
                            <strong>Reality Check:</strong> ${details.reality}
                        </div>
                    </div>
                `;
                
                chatBody.appendChild(botMsg);
                chatBody.scrollTop = chatBody.scrollHeight;

                // UI Changes: Show Reset
                document.getElementById('ssResetBtn').style.display = 'block';

            }, 2000); 
        }

        function resetSafaltaBot() {
            // Uncheck all
            const checkboxes = document.querySelectorAll('#ssChecklistItems input');
            checkboxes.forEach(cb => cb.checked = false);

            // Remove selected visuals
            const items = document.querySelectorAll('.ss-checkbox-item');
            items.forEach(item => item.classList.remove('selected'));

            // Reset UI View to Chat
            document.getElementById('ssChecklistPage').style.display = 'none';
            document.getElementById('ssChatBody').style.display = 'flex';

            // Buttons
            document.getElementById('ssSubmitBtn').style.display = 'none';
            document.getElementById('ssResetBtn').style.display = 'none';
            // Note: We don't show Start button again immediately, we show intro text

            // Clear chat and show Welcome Back message
            const chatBody = document.getElementById('ssChatBody');
            chatBody.innerHTML = '';
            
            // Simple animation for reset
            showTypingDelay(600).then(() => {
                addBotMessage('<strong>Welcome Back!</strong><br>Let\'s try again.');
                document.getElementById('ssStartBtn').style.display = 'block';
            });
        }