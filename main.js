const timeDisplayDiv = document.querySelector("[data-function='timeDisplay']")
timeDisplayDiv.textContent = "00.00";

class Display {
    constructor(timeDisplayDiv) {
        let flag = true;
        let _time = 0;
        let _totalTime = 0;
        let _intervalIndex = 0;
        let _totalTimeIntervalIndex = 0;
        let _timeToDisplay = "";
        let _totalTimeToDisplay = "";

        this.timeConverter = (time) => {
            let _centiSeconds = 0
            let _seconds = 0;
            let _minutes = 0;
            let _hours = 0;
            let timeToDisplay;

            _centiSeconds = _time % 100;
            if (_centiSeconds < 10) {
                _centiSeconds = `0${_centiSeconds}`
            };
            _seconds = Math.floor((time / 100) % 60);
            if (_seconds < 10) {
                _seconds = `0${_seconds}`
            };
            _minutes = Math.floor((time / (100 * 60)) % 60);
            if (_minutes < 10) {
                _minutes = `0${_minutes}`
            };
            _hours = Math.floor((time / (100 * 60 * 60)));
            if (_hours < 24) {
                _hours = `0${_hours}`
            };
            if (_hours > 0) {
                timeToDisplay = `${_hours}:${_minutes}:${_seconds}.${_centiSeconds}`;
            } else if (_minutes > 0) {
                timeToDisplay = `${_minutes}:${_seconds}.${_centiSeconds}`;
            } else {
                timeToDisplay = `${_seconds}.${_centiSeconds}`;
            }
            return timeToDisplay;
        }

        this.startPauseTime = () => {
            if (flag) {

                _totalTimeIntervalIndex = setInterval(() => {
                    _totalTime++;
                    _totalTimeToDisplay = this.timeConverter(_totalTime);
                }, 10);

                _intervalIndex = setInterval(() => {
                    _time++;
                    _timeToDisplay = this.timeConverter(_time);

                    timeDisplayDiv.textContent = _timeToDisplay;
                }, 10);
                flag = !flag;
            } else {
                clearInterval(_intervalIndex);
                clearInterval(_totalTimeIntervalIndex);
                flag = !flag;
            }
        }

        this.lap = () => {
            if (!flag) {
                _time = 0;
                clearInterval(_intervalIndex);
                timeDisplayDiv.textContent = `00.00`;
                _intervalIndex = setInterval(() => {
                    _time++;
                    _timeToDisplay = this.timeConverter(_time);
                    timeDisplayDiv.textContent = _timeToDisplay;
                }, 10);
            }
        }

        this.resetTime = () => {
            _time = 0;
            clearInterval(_intervalIndex);
            clearInterval(_totalTimeIntervalIndex);
            timeDisplayDiv.textContent = `00.00`;
            flag = true;
        }

        this.getTime = () => _timeToDisplay;
        this.getTotalTime = () => _totalTimeToDisplay;
        this.getFlag = () => flag;
    }
}
class ListElement {
    constructor(lapTime, totalTime) {
        this.lapTime = lapTime;
        this.totalTime = totalTime;
    }
}

class List {
    constructor() {
        const _lapList = [];
        const ul = document.querySelector("[data-function='lapList']")

        this.addlapToList = (lapTime, totalTime) => {
            const lap = new ListElement(lapTime, totalTime);
            _lapList.unshift(lap);
        }

        this.renderLapList = (lapList) => {
            ul.textContent = "";
            lapList.forEach((element, index) => {
                const li = document.createElement("li");
                li.className = "scoresList__li"

                const divNumber = document.createElement("div");
                divNumber.textContent = `${lapList.length - index}.`
                divNumber.className = "scoresList__div  scoresList__div--number";

                const divLapTime = document.createElement("div");
                divLapTime.textContent = `${element.lapTime}`
                divLapTime.className = "scoresList__div";

                const divTotalTime = document.createElement("div");
                divTotalTime.textContent = `${element.totalTime}`
                divTotalTime.className = "scoresList__div";

                ul.appendChild(li);
                li.appendChild(divNumber);
                li.appendChild(divLapTime);
                li.appendChild(divTotalTime);
            })
        }
        this.resetList = () => {
            ul.textContent = "";
            _lapList.splice(0, _lapList.length);
        };
        this.getList = () => _lapList;
    }
}

const timeDisplay = new Display(timeDisplayDiv);
const list = new List();

class Panel {
    constructor(list, display) {
        const btnReset = document.querySelector("[data-function='reset']")
        const btnStart = document.querySelector("[data-function='start']")
        const btnLap = document.querySelector("[data-function='lap']")

        this.changeStartStopIcon = (flag) => {
            if (flag) {
                btnStart.classList.remove('panel__btn--start')
                btnStart.classList.add('panel__btn--pause')
                btnStart.querySelector('i').classList.remove('fa-play')
                btnStart.querySelector('i').classList.add('fa-pause')
            } else {
                btnStart.classList.remove('panel__btn--pause')
                btnStart.classList.add('panel__btn--start')
                btnStart.querySelector('i').classList.remove('fa-pause')
                btnStart.querySelector('i').classList.add('fa-play')
            }
        }

        btnReset.addEventListener('click', () => {
            display.resetTime();
            list.resetList();
        })
        btnStart.addEventListener('click', () => {
            display.startPauseTime();
            this.changeStartStopIcon(!display.getFlag());
        })
        btnLap.addEventListener('click', () => {
            display.lap();
            if (!display.getFlag()) {
                list.addlapToList(display.getTime(), display.getTotalTime());
            }
            list.renderLapList(list.getList());
        })


    }
}

const panel = new Panel(list, timeDisplay);