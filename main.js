const append_this = (parent, childTag, childHTML = "") => {
    var child = document.createElement(childTag);
    child.innerHTML = childHTML;
    parent.appendChild(child);
    return child;
};

const add_answear = (container, type, answear_text, id, question_id) => {
    var answear = append_this(container, "input");
    answear.setAttribute("type", type);

    answear.setAttribute("id", id);

    var label = append_this(container, "label", answear_text.slice(1));
    label.setAttribute("for", id);

    append_this(container, "br");
    if (answear_text[0] == "+") return true;
    return false;
};

const add_question_container = (main, index, data) => {
    var question_id = "q" + index.toString();
    var questionContainer = append_this(main, "div");
    questionContainer.classList = "questionContainer";

    var query = data.replaceAll("\r", "").split("\n").slice(1, -1);
    append_this(questionContainer, "div", query[1]);

    var choices = append_this(questionContainer, "form");

    var all_correct = [];

    for (var i = 2; i < query.length; i++) {
        var answear_id = "q" + index.toString() + "a" + i.toString();
        var correct = add_answear(
            choices,
            query[0],
            query[i],
            answear_id,
            question_id
        );
        if (correct) all_correct.push(answear_id);
    }

    var submit = append_this(choices, "input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Send inn svar");
};

const add_contet = (main, data) => {
    for (var i = 0; i < data.length; i++) {
        if (i % 2 == 0) {
            append_this(main, "div", data[i].replaceAll("\n", "<br>"));
            continue;
        }
        add_question_container(main, i, data[i]);
    }
};

const clear = (el) => {
    el.innerHTML = "";
};

const load_text = (file, id) => {
    fetch(file)
        .then((res) => res.text())
        .then((data) => {
            var buttons = document.getElementsByClassName("here");
            for (var i = 0; i < buttons.length; i++)
                if (buttons[i].id != id) buttons[i].classList = "";

            document.getElementById(id).classList = "here";

            const main = document.getElementById("main");

            clear(main);

            var start = data.indexOf("#") + 1;
            var end = data.indexOf("#", start);

            append_this(main, "h1", data.slice(start, end));

            add_contet(main, data.slice(end + 1).split("[q]"));
        })
        .catch((e) => console.log(e));
};

document.onload = load_text("./TXT/test.txt", "home");
