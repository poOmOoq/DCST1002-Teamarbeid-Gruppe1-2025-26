/**
 * @param {string} question_id
 */
const check_answear = (question_id) => {
    let question = document.getElementById(question_id);
    let answear_label = question.children[1].lastElementChild;
    let correct = sessionStorage.getItem(question_id).split(",");
    let flag = true;
    correct.forEach((id) => {
        let answear = document.getElementById(id);
        if (!answear.checked) flag = false;
    });
    if (flag) {
        answear_label.classList = "answearChecker correct";
        answear_label.innerHTML = "Riktig svar";
    } else {
        answear_label.classList = "answearChecker incorrect";
        answear_label.innerHTML = "Feil svar";
    }
};

/**
 * @param {string} question
 * @param {string} answear
 */
const answear_clicked = (question_id, answear_id) => {
    let question = document.getElementById(question_id);
    let all_answears = question.children[1].children;
    if (all_answears[0].type == "checkbox") return;
    for (let i = 0; i < all_answears.length; i++) {
        let el = all_answears[i];
        if (el.nodeName != "INPUT" || el.type != "radio") continue;
        el.checked = el.id == answear_id;
    }
};

/**
 * @param {HTMLElement} container
 * @param {string} type
 * @param {string} answear_text
 * @param {string} id
 * @param {string} question_id
 * @returns {boolean}
 */
const add_answear = (container, type, answear_text, id, question_id) => {
    let answear = append_this(container, "input");
    answear.setAttribute("type", type);
    answear.id = id;
    answear.setAttribute(
        "onclick",
        `answear_clicked("${question_id}", "${id}")`
    );

    let label = append_this(container, "label", answear_text.slice(1));
    label.setAttribute("for", id);

    append_this(container, "br");
    if (answear_text[0] == "+") return true;
    return false;
};

/**
 * @param {HTMLElement} main
 * @param {number} index
 * @param {string} data
 */
const add_question_container = (main, index, data) => {
    let question_id = "q" + index.toString();

    let outerContainer = append_this(main, "div");
    outerContainer.classList = "outerContainer";

    let questionContainer = append_this(outerContainer, "div");
    questionContainer.classList = "questionContainer";
    questionContainer.id = question_id;

    let query = data.replaceAll("\r", "").split("\n").slice(1, -1);
    append_this(questionContainer, "div", query[1]);

    let choices = append_this(questionContainer, "form");

    let all_correct = [];

    for (let i = 2; i < query.length; i++) {
        let answear_id = "q" + index.toString() + "a" + i.toString();
        let correct = add_answear(
            choices,
            query[0],
            query[i],
            answear_id,
            question_id
        );
        if (correct) all_correct.push(answear_id);
    }

    sessionStorage.setItem(question_id, all_correct.toString());

    let button = append_this(choices, "input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Send inn svar");
    button.setAttribute("onclick", `check_answear("${question_id}")`);

    append_this(choices, "br");

    let state = append_this(choices, "div", "Ikke svart på");
    state.classList.toggle("answearChecker");
    state.classList.toggle("notAnsweared");
};

/**
 * @param {HTMLElement} main
 * @param {string[]} data
 */
const add_contet = (main, data) => {
    for (let i = 0; i < data.length; i++) {
        /* if content is not a question */
        if (i % 2 == 0) {
            append_this(main, "div", data[i].replaceAll("\n", "<br>"));
            continue;
        }
        add_question_container(main, ~~(i / 2) + 1, data[i]);
    }
};
