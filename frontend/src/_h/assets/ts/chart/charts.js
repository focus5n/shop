import { getCSSVariableValue } from "../../../utils";
import 'peity';
const $ = window.jQuery;

const peityInit = () => {
    const peityOne = $("#peity-chart-one").peity("line", {
        width: 1000,
        height: 30,
        stroke: "#cbac7b",
        fill: false,
        strokeWidth: 2,
    });

    const peityTwo = $("#peity-chart-two").peity("line", {
        width: 1000,
        height: 30,
        stroke: "#cbac7b",
        fill: false,
        strokeWidth: 2,
    });
    const peityThree = $("#peity-chart-three").peity("line", {
        width: 1000,
        height: 30,
        stroke: "#cbac7b",
        fill: false,
        strokeWidth: 2,
    });
    setInterval(function () {
        const random = Math.round(Math.random() * 10);
        const values = peityOne.text().split(",");
        values.shift();
        values.push(random);

        peityOne.text(values.join(",")).change();

        const randomTwo = Math.round(Math.random() * 10);
        const valuesTwo = peityTwo.text().split(",");
        valuesTwo.shift();
        valuesTwo.push(randomTwo);

        peityTwo.text(valuesTwo.join(",")).change();

        const randomThree = Math.round(Math.random() * 10);
        const valuesThree = peityThree.text().split(",");
        valuesThree.shift();
        valuesThree.push(randomThree);

        peityThree.text(valuesThree.join(",")).change();
    }, 2000);
}

const CPUChartInit = () => {
    const el = document.querySelector('#cpu-chart')
    if (!el) return

    if (!el) {
        return;
    }

    var options = {
        size: el.getAttribute("data-h-size")
            ? parseInt(el.getAttribute("data-h-size"))
            : 70,
        lineWidth: el.getAttribute("data-h-line")
            ? parseInt(el.getAttribute("data-h-line"))
            : 11,
        rotate: el.getAttribute("data-kt-rotate")
            ? parseInt(el.getAttribute("data-kt-rotate"))
            : 145,
    };

    var canvas = document.createElement("canvas");
    var span = document.createElement("span");


    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; 
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
    drawCircle(
        getCSSVariableValue("--bs-primary"),
        options.lineWidth,
        100 / 150
    );
    drawCircle(
        getCSSVariableValue("--bs-success"),
        options.lineWidth,
        100 / 250
    );
}

const MeomoryChartInit = () => {
    var el = document.getElementById("memory-chart");

    if (!el) {
        return;
    }

    var options = {
        size: el.getAttribute("data-h-size")
            ? parseInt(el.getAttribute("data-h-size"))
            : 70,
        lineWidth: el.getAttribute("data-h-line")
            ? parseInt(el.getAttribute("data-h-line"))
            : 11,
        rotate: el.getAttribute("data-kt-rotate")
            ? parseInt(el.getAttribute("data-kt-rotate"))
            : 145,
    };

    var canvas = document.createElement("canvas");
    var span = document.createElement("span");

    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
    drawCircle(
        getCSSVariableValue("--bs-primary"),
        options.lineWidth,
        100 / 150
    );
    drawCircle(
        getCSSVariableValue("--bs-success"),
        options.lineWidth,
        100 / 250
    );
}

const DiskChartInit = () => {
    const el = document.querySelector('#disk-chart')
    if (!el) return

    const options = {
        size: el.getAttribute("data-h-size")
            ? parseInt(el.getAttribute("data-h-size"))
            : 70,
        lineWidth: el.getAttribute("data-h-line")
            ? parseInt(el.getAttribute("data-h-line"))
            : 11,
        rotate: el.getAttribute("data-h-rotate")
            ? parseInt(el.getAttribute("data-h-rotate"))
            : 195,
    }

    const canvas = document.createElement("canvas")
    const span = document.createElement("span")
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
    drawCircle(
        getCSSVariableValue("--bs-primary"),
        options.lineWidth,
        150 / 150
    );
}

const LoadChartInit = () => {
    const el = document.querySelector('#load-chart')
    if (!el) return

    const options = {
        size: el.getAttribute("data-h-size")
            ? parseInt(el.getAttribute("data-h-size"))
            : 70,
        lineWidth: el.getAttribute("data-h-line")
            ? parseInt(el.getAttribute("data-h-line"))
            : 11,
        rotate: el.getAttribute("data-h-rotate")
            ? parseInt(el.getAttribute("data-h-rotate"))
            : 195,
    }

    const canvas = document.createElement("canvas")
    const span = document.createElement("span")
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
    drawCircle(
        getCSSVariableValue("--bs-primary"),
        options.lineWidth,
        150 / 150
    );
}


export { peityInit, CPUChartInit, MeomoryChartInit ,DiskChartInit, LoadChartInit }