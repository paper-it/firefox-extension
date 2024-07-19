export async function waitForTag(tagName: string) {
    return new Promise<Node>(resolve => {
        const normalizedTagName = tagName.toLowerCase();
        const elements = document.getElementsByTagName(normalizedTagName);

        if (elements[0]) {
            return resolve(elements[0]);
        }

        const observer = new MutationObserver((mutations) => {
            const targetMutation = mutations.find(mutation => {
                if (mutation.type !== 'childList') {
                    return false;
                }

                return mutation.target.nodeName.toLowerCase() === normalizedTagName;
            });

            if (targetMutation) {
                observer.disconnect();

                resolve(targetMutation.target);
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}
