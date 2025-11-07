const pop_up_starter = () => {
    fetch("./TXT/popUp.txt")
        .then((res) => res.text())
        .then((data) => {
            data = data.split("\n");
            let str = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].includes("\r")) data[i] = data[i].slice(0, -1);
                str += data[i] + "|";
            }
            sessionStorage.setItem("ads", str);
            return pop_up_machine();
        });
};

const pop_up_show = (adId) => {
    const popUp = document.getElementById("popUp");
    const grayOut = document.getElementById("grayOut");
    const placement = Math.floor(Math.random() * 3);
    const popUpClose = document.getElementById("popUpClose");
    const content = document.getElementById("popUpContent");
    const scam = document.getElementById("popUpScam");
    const ad = sessionStorage.getItem("ads").split("|")[adId].split("*");
    const color = Math.floor(Math.random() * 3);
    let maxTime = Math.ceil(Math.random() * 3) * 5;

    content.innerHTML = ad[0];
    scam.innerHTML = ad[1];

    popUpClose.onclick = null;
    popUpClose.onmouseover = null;
    popUpClose.onmouseout = null;
    popUpClose.classList = "";
    popUp.classList = "popUpBorder correct"; //color == 0 ? "popUpBorder" : color == 1 ? "correct" : "incorrect";
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

    let time = maxTime;
    let timeID = setInterval(() => {
        popUpClose.innerHTML = time;
        time--;
    }, 1000);

    let fadeID = 0;
    let opacityID = setTimeout(() => {
        let opacity = 0;
        clearInterval(timeID);

        popUpClose.style.opacity = 0;
        popUpClose.innerHTML = "&times;";

        fadeID = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.04;
                popUpClose.style.opacity = opacity;
            } else {
                clearInterval(fadeID);
            }
        }, 200);
    }, 1000 * (maxTime + 1));

    let closeID = setTimeout(() => {
        popUpClose.onmouseover = () => {
            document.getElementById("popUpClose").style.opacity = 0.7;
        };
        popUpClose.onmouseout = () => {
            document.getElementById("popUpClose").style.opacity = 1;
        };

        popUpClose.onclick = pop_up_close;
        popUpClose.classList = "popUpCloseReady";
    }, 1000 * (maxTime + 6));

    sessionStorage.setItem(
        "ID",
        [timeID, fadeID, opacityID, closeID].toString()
    );
};

const pop_up_machine = () => {
    const ALL_ADS = sessionStorage
        .getItem("ads")
        .split("|")
        .slice(0, -1)
        .map((ad) => {
            return ad.split("*");
        });
    let adId = Math.floor(Math.random() * ALL_ADS.length);
    let time = Math.floor(Math.random() * 3) + 5;

    setTimeout(pop_up_show, time * 1000, adId);
};

const clear_time = () => {
    sessionStorage
        .getItem("ID")
        .split(",")
        .forEach((ID) => {
            try {
                clearInterval(ID);
            } catch {
                try {
                    clearTimeout(ID);
                } catch {}
            }
        });
};

const pop_up_close = () => {
    clear_time();
    const grayOut = document.getElementById("grayOut");
    const popUp = document.getElementById("popUp");

    [grayOut, popUp].forEach((el) => {
        if (!el.classList.contains("hide")) el.classList.toggle("hide");
    });

    pop_up_machine();
};
