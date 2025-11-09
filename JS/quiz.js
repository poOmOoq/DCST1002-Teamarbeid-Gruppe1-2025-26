const quiz_fail = (reason = null) => {
    const MAIN = document.getElementById("main");
    const container = append_this(MAIN, "div");
    append_this(container, "br");
    append_this(container, "h1", ":(").style.justifySelf = "center";
    append_this(container, "br");
    append_this(
        container,
        "h1",
        reason == "scam" ? "Du ble scamma!" : "Du klarte ikke testen."
    ).style.justifySelf = "center";
    append_this(container, "br");
    append_this(
        container,
        "div",
        "Det kan være en god idee å lese igjennom de andre artikklene på nettsiden."
    ).style.justifySelf = "center";
};

const quiz_win = () => {
    const MAIN = document.getElementById("main");
    const container = append_this(MAIN, "div");
    append_this(container, "br");
    append_this(container, "h1", "Gratulerer!").style.justifySelf = "center";
    append_this(container, "br");
    append_this(container, "h1", "Du klarte testen!").style.justifySelf =
        "center";
    append_this(container, "br");
    append_this(
        container,
        "div",
        'Du er "offisielt" godt utrustet imot phishing!'
    ).style.justifySelf = "center";
};

const check_quiz = (reason = null) => {
    sessionStorage.setItem("page", "finish");
    pop_up_close();

    const questions = [
        ...document.getElementsByClassName("questionContainer"),
    ].slice(0, -1);

    let flag = true;

    questions.forEach((question) => {
        if (!flag) return;
        let correct = sessionStorage.getItem(question.id).split(",");
        [...question.children[1].children].forEach((answear) => {
            if (
                flag &&
                answear.id != "" &&
                correct.includes(answear.id) ^ answear.checked
            ) {
                flag = false;
                return;
            }
        });
    });

    document.getElementById("main").innerHTML = "";

    if (flag) quiz_win();
    else quiz_fail(reason);
};

const quiz_answear_clicked = (question_id, answear_id) => {
    document.getElementById(question_id).classList.remove("notAnsweared");
    answear_clicked(question_id, answear_id);
    const questions = [...document.getElementsByClassName("notAnsweared")];
    if (questions.length != 1) return;
    questions[0].classList.toggle("notAnsweared");
    questions[0].classList.toggle("ready");
    questions[0].addEventListener("click", check_quiz);
};

/**
 * @param {HTMLElement} main
 * @param {number} index
 * @param {string} data
 */
const add_quiz_container = (main, index, data) => {
    let question_id = "q" + index.toString();

    let outerContainer = append_this(main, "div");
    outerContainer.classList = "outerContainer";

    let questionContainer = append_this(outerContainer, "div");
    questionContainer.classList = "questionContainer notAnsweared";
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
};
