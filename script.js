let numbers = [];

// สุ่มตัวเลข
function generateNumbers() {
    const count = parseInt(document.getElementById("count").value);
    numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * 100) + 1);
    }
    render(numbers);
    document.getElementById("result").innerText = "-";
}

// หน่วงเวลา
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// แสดงผลกล่องตัวเลข
function render(arr, highlight = {}) {
    const box = document.getElementById("visual");
    box.innerHTML = "";

    arr.forEach((num, i) => {
        const div = document.createElement("div");
        div.className = "num-box";
        div.textContent = num;

        if (highlight.compare?.includes(i)) {
            div.classList.add("compare");
        }
        if (highlight.swap?.includes(i)) {
            div.classList.add("swap");
        }
        if (highlight.done) {
            div.classList.add("done");
        }

        box.appendChild(div);
    });
}

/* -------------------- BUBBLE SORT -------------------- */
async function doBubble() {
    let arr = [...numbers];
    let n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            render(arr, { compare: [j, j + 1] });
            await sleep(325);

            if (arr[j] > arr[j + 1]) {

                render(arr, { swap: [j, j + 1] });
                await sleep(325);

                let t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;

                render(arr, { swap: [j, j + 1] });
                await sleep(325);
            }
        }
    }

    render(arr, { done: true });
    showResult(arr);
}

/* -------------------- SELECTION SORT -------------------- */
async function doSelection() {
    let arr = [...numbers];

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            render(arr, { compare: [minIndex, j] });
            await sleep(325);

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        render(arr, { swap: [i, minIndex] });
        await sleep(325);

        let t = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = t;

        render(arr, { swap: [i, minIndex] });
        await sleep(325);
    }

    render(arr, { done: true });
    showResult(arr);
}

/* -------------------- INSERTION SORT -------------------- */
async function doInsertion() {
    let arr = [...numbers];

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {

            render(arr, { compare: [j, j + 1] });
            await sleep(325);

            arr[j + 1] = arr[j];
            j--;

            render(arr, { swap: [j + 1] });
            await sleep(325);
        }

        arr[j + 1] = key;
        render(arr, { swap: [j + 1] });
        await sleep(325);
    }

    render(arr, { done: true });
    showResult(arr);
}

/* -------------------- SEARCHING -------------------- */

function doLinear() {
    const target = parseInt(document.getElementById("searchValue").value);
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            showResult(`พบที่ index: ${i}`);
            return;
        }
    }
    showResult("ไม่พบข้อมูล");
}

function doBinary() {
    const target = parseInt(document.getElementById("searchValue").value);
    let arr = [...numbers].sort((a, b) => a - b);

    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            showResult(`หลัง sort: ${arr.join(", ")}\nพบที่ index: ${mid}`);
            return;
        }

        arr[mid] < target ? low = mid + 1 : high = mid - 1;
    }

    showResult("ไม่พบข้อมูล");
}

/* -------------------- RESULT -------------------- */
function showResult(text) {
    if (Array.isArray(text)) {
        document.getElementById("result").innerText = text.join(", ");
    } else {
        document.getElementById("result").innerText = text;
    }
}
