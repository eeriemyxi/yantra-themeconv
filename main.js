const SUBSTITUTES = {
    "Theme Name": "name",
    "Background Color": "bgColor",
    "Command Color": "cmdColor",
    "Suggestions Color": "suggestionsColor",
    "Suggestion Bar Color": "suggestionsBgColor",
    "Input Color": "inputAndBtnsColor",
    "Normal Text & Arrow Color": "resultColor",
    "Error Text Color": "errorColor",
    "Positive Text Color": "successColor",
    "Warning Text Color": "warnColor"
}

function oldToNewConfig(text) {
    const newConfig = {}

    for (const line of text.split("\n")) {
        const data = line.split(":** ")
        const key = data[0].slice(2)
        const value = data[1]
        const sub = SUBSTITUTES[key]
        if (sub === undefined) continue;
        newConfig[sub] = (sub != "name" ? '#' : '') + value
    }

    return newConfig
}

async function convertButton() {
    const oldConfTag = document.getElementById("old");
    const convBtnTag = document.getElementById("convbtn");

    const newConfig = oldToNewConfig(oldConfTag.value)
    navigator.clipboard.writeText(JSON.stringify(newConfig, undefined, "    "))

    const _oldTxt = convBtnTag.textContent
    convBtnTag.textContent = "Result copied to clipboard!"
    oldConfTag.value = ""
    await new Promise(r => setTimeout(r, 2000));
    convBtnTag.textContent = _oldTxt
}
