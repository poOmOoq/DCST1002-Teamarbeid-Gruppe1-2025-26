const pop_up_starter = () => {
    clear_time();
    fetch("./TXT/popUp.txt")
        .then((res) => res.text())
        .then((data) => {
            data = data.split("\n");
            let str = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].includes("\r")) data[i] = data[i].slice(0, -1);
                str += data[i] + "|";
            }
            sessionStorage.removeItem("ads");
            sessionStorage.setItem("ads", str);
            return pop_up_machine();
        });
};

const pop_up_show = (ad) => {
    clear_time();
    const popUp = document.getElementById("popUp");
    const grayOut = document.getElementById("grayOut");
    const popUpClose = document.getElementById("popUpClose");
    const content = document.getElementById("popUpContent");
    const scam = document.getElementById("popUpScam");
    let placement = Math.floor(Math.random() * 3);
    let color = Math.floor(Math.random() * 3);
    let maxTime = Math.ceil(Math.random() * 3) * 5;

    content.innerHTML = ad[0];
    scam.innerHTML = ad[1];

    popUpClose.onclick = null;
    popUpClose.onmouseover = null;
    popUpClose.onmouseout = null;
    popUpClose.classList = "";
    if (sessionStorage.getItem("page") != "quiz") return;
    popUp.classList =
        "popUpBorder " +
        (color == 0 ? "popUpBorder" : color == 1 ? "correct" : "incorrect");
    popUp.style.marginTop = (-popUp.offsetHeight - 1).toString() + "px";

    if (placement == 0) {
        popUp.style.top =
            document.getElementById("topNav").offsetHeight.toString() + "px";
    }
    if (placement == 1) {
        grayOut.classList = "";
        popUp.style.top =
            Math.floor(
                (grayOut.offsetHeight - popUp.offsetHeight) * 0.5
            ).toString() + "px";
        popUp.style.left =
            Math.floor(
                (grayOut.offsetWidth - popUp.offsetWidth) * 0.5
            ).toString() + "px";
    }

    if (placement == 2) {
        grayOut.classList = "";
        popUp.style.top =
            Math.floor(
                grayOut.offsetHeight - popUp.offsetHeight - 1
            ).toString() + "px";
        popUp.style.left =
            Math.floor(grayOut.offsetWidth - popUp.offsetWidth).toString() +
            "px";

        grayOut.classList = "hide";
    }

    popUpClose.style.float =
        Math.floor(Math.random() * 2) == 0 ? "left" : "right";

    sessionStorage.setItem("time", maxTime);
    let timeID = setInterval(() => {
        let time = Number(sessionStorage.getItem("time"));
        if (time >= 0) {
            popUpClose.innerHTML = time.toString();
            sessionStorage.setItem("time", time - 1);
        } else {
            clearInterval(timeID);
        }
    }, 1000);

    sessionStorage.setItem("opacity", 0);

    let fadeID = setInterval(() => {
        if (Number(sessionStorage.getItem("time")) <= 0) {
            let opacity = Number(sessionStorage.getItem("opacity"));
            popUpClose.innerHTML = "&times;";
            if (opacity < 1) {
                opacity += 0.04;
                popUpClose.style.opacity = opacity;
                sessionStorage.setItem("opacity", opacity);
            } else {
                popUpClose.onmouseover = () => {
                    document.getElementById("popUpClose").style.opacity = 0.7;
                };
                popUpClose.onmouseout = () => {
                    document.getElementById("popUpClose").style.opacity = 1;
                };

                popUpClose.onclick = pop_up_close;
                popUpClose.classList = "popUpCloseReady";
                clearInterval(fadeID);
            }
        }
    }, 200);

    sessionStorage.setItem("ID", [timeID, fadeID].toString());
};

const pop_up_machine = () => {
    const ALL_ADS = sessionStorage
        .getItem("ads")
        .split("|")
        .slice(0, -1)
        .map((ad) => {
            return ad.split("*");
        });

    setTimeout(
        pop_up_show,
        Math.floor(Math.random() * 3) + 5 * 1000,
        ALL_ADS[Math.floor(Math.random() * ALL_ADS.length)]
    );
};

const clear_time = () => {
    try {
        sessionStorage
            .getItem("ID")
            .split(",")
            .forEach((ID) => {
                try {
                    clearInterval(ID);
                } catch {}
            });
    } catch {}
};

const pop_up_close = () => {
    try {
        clear_time();
    } catch {}
    const grayOut = document.getElementById("grayOut");
    const popUp = document.getElementById("popUp");

    [grayOut, popUp].forEach((el) => {
        if (!el.classList.contains("hide")) el.classList.toggle("hide");
    });

    pop_up_machine();
};
