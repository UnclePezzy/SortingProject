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

// ฟังก์ชันหน่วงเวลา
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// แสดงตัวเลขแบบกล่อง
function render(arr, highlight = {}) {
    const box = document.getElementById("visual");
    box.innerHTML = "";

    arr.forEach((num, i) => {
        const div = document.createElement("div");
        div.textContent = num;

        div.style.display = "inline-block";
        div.style.padding = "10px";
        div.style.margin = "5px";
        div.style.minWidth = "35px";
        div.style.textAlign = "center";
        div.style.border = "2px solid black";
        div.style.borderRadius = "6px";
        div.style.fontSize = "20px";

        // สีตามสถานะ
        if (highlight.compare && highlight.compare.includes(i)) {
            div.style.background = "yellow"; // กำลังเปรียบเทียบ
        }
        if (highlight.swap && highlight.swap.includes(i)) {
            div.style.background = "red"; // สลับ
        }
        if (highlight.done) {
            div.style.background = "lightgreen"; // ทำเสร็จ
        }

        box.appendChild(div);
    });
}

// -------------------- Bubble Sort Visualization --------------------
async function doBubble() {
    let arr = [...numbers];
    let n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            // เปรียบเทียบ
            render(arr, { compare: [j, j + 1] });
            await sleep(325);

            if (arr[j] > arr[j + 1]) {
                // แสดงกำลังสลับ
                render(arr, { swap: [j, j + 1] });
                await sleep(325);

                // สลับจริง
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                render(arr, { swap: [j, j + 1] });
                await sleep(325);
            }
        }
    }

    render(arr, { done: true });
    showResult(arr);
}

// -------------------- Selection Sort Visualization --------------------
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

        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        render(arr, { swap: [i, minIndex] });
        await sleep(325);
    }

    render(arr, { done: true });
    showResult(arr);
}

// -------------------- Insertion Sort Visualization --------------------
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

// Searching (ไม่ต้องทำ visualization)
function doLinear() {
    const target = parseInt(document.getElementById("searchValue").value);
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            showResult(`พบที่ index ${i}`);
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
            showResult(`ข้อมูลหลัง sort: ${arr.join(", ")}\nพบที่ index ${mid}`);
            return;
        } else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    showResult("ไม่พบข้อมูล");
}

function showResult(text) {
    if (Array.isArray(text)) {
        document.getElementById("result").innerText = text.join(", ");
    } else {
        document.getElementById("result").innerText = text;
    }
}
