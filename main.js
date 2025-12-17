const SUBSTITUTES = {
    "Theme Name": "name",
    "Background Color": "bgColor",
    "Command Color": "commandColor",
    "Suggestions Color": "suggestionTextColor",
    "Suggestions Bar Color": "suggestionBgColor",
    "Input Color": "inputLineTextColor",
    "Normal Text & Arrow Color": "resultTextColor",
    "Error Text Color": "errorTextColor",
    "Positive Text Color": "successTextColor",
    "Warning Text Color": "warningTextColor"
}

function oldToNewConfig(text) {
    const newConfig = {}

    for (const line of text.split("\n")) {
        const data = line.split(":** ")
        const key = data[0].slice(2)
        const value = data[1]
        if (key in SUBSTITUTES) newConfig[SUBSTITUTES[key]] = value
    }

    return newConfig
}

async function convertButton() {
    const oldconftag = document.getElementById("old");
    const convbtntag = document.getElementById("convbtn");

    const newconfig = oldToNewConfig(oldconftag.value)
    navigator.clipboard.writeText(JSON.stringify(newconfig))

    const _oldtxt = convbtntag.textContent
    convbtntag.textContent = "Result copied to clipboard!"
    oldconftag.value = ""
    await new Promise(r => setTimeout(r, 2000));
    convbtntag.textContent = _oldtxt
}
