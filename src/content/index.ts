import { PaperOverlay } from "./PaperOverlay";
import { isHtmlDocument } from "./libs/utils";

async function initialize() {
    if (!isHtmlDocument()) {
        return;
    }

    const paperOverlay = new PaperOverlay();

    await paperOverlay.initialize();
}

initialize()
    .catch(error => console.error(error));
