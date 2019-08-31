const timeDisplayDiv = document.querySelector("[data-function='timeDisplay']")
timeDisplayDiv.textContent = "00:00";

class Display {
    constructor(timeDisplayDiv) {
        let flag = true;
        let _time = 0;
        let _totalTime = 0;
        let _intervalIndex = 0;
        let _totalTimeIntervalIndex = 0;
        let _timeToDisplay = "";
        let _totalTimeToDisplay = "";
        this.getTime = () => _time;
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
                timeToDisplay = `${_hours}:${_minutes}:${_seconds}:${_centiSeconds}`;
            } else if (_minutes > 0) {
                timeToDisplay = `${_minutes}:${_seconds}:${_centiSeconds}`;
            } else {
                timeToDisplay = `${_seconds}:${_centiSeconds}`;
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
                timeDisplayDiv.textContent = `00:00`;
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
            timeDisplayDiv.textContent = `00:00`;
            flag = true;
        }
        this.getTimeToDisplay = () => _timeToDisplay;
        this.getTotalTime = () => _totalTimeToDisplay;
        this.getFlag = () => flag;
    }
}
class List {
    constructor() {
        const _lapList = ["czas01", "czas02", "czas03"];
        const ul = document.querySelector("[data-function='lapList']")
        let _addingIndex = 0;

        this.addlapToList = () => {
            _lapList.push("coś");
        }

        this.renderLapList = () => {
            // _lapList.
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
            display.startPauseTime();
            console.log(display.getFlag());
        })
        btnLap.addEventListener('click', () => {
            display.lap();
            console.log("time:" + display.getTimeToDisplay());
            console.log("total time:" + display.getTotalTime());
            list.addlapToList();
        })
    }
}


const panel = new Panel(list, timeDisplay);