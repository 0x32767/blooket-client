window.chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method == "GET" && details.type == "xmlhttprequest" && details.initiator.startsWith("chrome") == false) {
            fetch(details.url)
                .then(response => response.json())
                .then(function(json) {
                    console.log(`
                    
                    const data = ${JSON.stringify(json)};
                    let p_data = {};
                    let elms = document.getElementsByClassName("styles__answerText___2eIBw-camelCase");
                    let ques = document.getElementsByClassName("styles__questionText___2MlSZ-camelCase")[0].innerText;
                    
                    data.questions.forEach(e => {
                        p_data[e.question] = e.correctAnswers[0];
                    });

                    for (let i = 0; i < elms.length; i++) {
                        if (elms[i].innerText == p_data[ques]) {
                            elms[i].parentElement.style.backgroundColor = "green";
                        } else {
                            elms[i].parentElement.style.backgroundColor = "red";
                        }
                    }
                    `);
                });
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);
