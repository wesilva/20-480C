export class HtmlTemplate {
    constructor(templateId) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = this.getTemplateHtml(templateId);
        this.templateElement = this.findTemplateElementInDiv(tempDiv);
    }

    createElement(data) {
        const element = this.templateElement.cloneNode(true);
        this.dataBindElement(element, data);
        return element;
    }

    getTemplateHtml(templateId) {
        return document.getElementById(templateId).textContent;
    }

    findTemplateElementInDiv(div) {
        let templateElement = div.firstChild;
        const ELEMENT_NODE = 1;
        while (templateElement && templateElement.nodeType !== ELEMENT_NODE) {
            templateElement = templateElement.nextSibling;
        }
        return templateElement;
    }

    dataBindElement(element, data) {
        for (let property in data) {
            if (data.hasOwnProperty(property)) {
                const value = data[property];
                const elementToBind = element.querySelector("[data-bind=" + property + "]");
                if (elementToBind) {
                    elementToBind.textContent = value.toString();
                }
            }
        }
    }
}