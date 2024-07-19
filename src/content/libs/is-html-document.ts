const HTML_CONTENT_TYPE = "text/html";

export function isHtmlDocument() {
    return document.contentType === HTML_CONTENT_TYPE;
}
