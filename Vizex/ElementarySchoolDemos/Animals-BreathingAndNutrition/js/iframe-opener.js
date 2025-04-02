const labsBookFrame = document.querySelector("#iframe-window");

function showIFrame(url) {
    labsBookFrame.classList.remove("iframe-closed");
    labsBookFrame.getElementsByTagName("iframe")[0].src = url;
}

function closeIFrame() {
    labsBookFrame.classList.add("iframe-closed");
    appInstance.SendMessage("tvi-task-opener", "NotifyOnCloseIFrame");
}

function openInNewTab() {
    const link = labsBookFrame.getElementsByTagName("iframe")[0].src;
    closeIFrame();
    window.open(link, '_blank').focus();
}
