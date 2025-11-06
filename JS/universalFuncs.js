/**
 * @param {HTMLElement} parent
 * @param {string} childTag
 * @param {string} childHTML
 * @returns {HTMLElement}
 */
const append_this = (parent, childTag, childHTML = "") => {
    let child = document.createElement(childTag);
    child.innerHTML = childHTML;
    parent.appendChild(child);
    return child;
};

/**
 * @param {HTMLElement} el
 */
const clear = (el) => {
    el.innerHTML = "";
};
