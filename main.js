const timeDisplayDiv = document.querySelector("[data-function='timeDisplay']")
timeDisplayDiv.textContent = "test";
class List {
    constructor() {
        const _lapList = [];
        const ul = document.querySelector("[data-function='lapList']")

        this.addlapToList = () => {
            _lapList.push("coś");
        }

        this.renderLapList = () => {

        }
    }

}
class Display {
    constructor(timeDisplayDiv) {
        let flag = true;
        let _time = 0;
        let _intervalIndex = 0;
        let _seconds = 0;
        let _minutes = 0;
        let _hours = 0;
        this.getTime = () => _time;
        this.startTime = () => {
            if (flag) {
                _intervalIndex = setInterval(() => {
                    _time++;
                    minutes =
                        timeDisplayDiv.textContent = `h${_hours}:m${_minutes}:${_time/100}`;
                }, 10);
                flag = !flag;
            } else {
                clearInterval(_intervalIndex);
                flag = !flag;
            }
        }
        this.pauseTime = () => {}
        this.resetTime = () => {
            _time = 0;
            timeDisplayDiv.textContent = `${_time}`;
            flag = true;
        }
    }
}

const list = new List();
const timeDisplay = new Display(timeDisplayDiv);

class Panel {
    constructor(list, display) {
        const btnReset = document.querySelector("[data-function='reset']")
        const btnStart = document.querySelector("[data-function='start']")
        const btnLap = document.querySelector("[data-function='lap']")

        this.resetList = () => {

        }
        btnReset.addEventListener('click', () => {
            display.resetTime();
        })
        btnStart.addEventListener('click', () => {
            display.startTime();
        })
        btnLap.addEventListener('click', () => {
            console.log(display.getTime())
            list.addlapToList();
        })
    }
}


const panel = new Panel(list, timeDisplay);