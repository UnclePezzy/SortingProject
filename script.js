let numbers = [];

// สุ่มตัวเลข
function generateNumbers() {
    const count = parseInt(document.getElementById("count").value);
    numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * 100) + 1);
    }
    document.getElementById("numbers").innerText = numbers.join(", ");
    document.getElementById("result").innerText = "-";
}
// Sorting Algorithms
function doBubble() {
    let arr = [...numbers];
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    showResult(arr);
}
function doSelection() {
    let arr = [...numbers];
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    showResult(arr);
}
function doInsertion() {
    let arr = [...numbers];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    showResult(arr);
}
// Searching
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
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    showResult("ไม่พบข้อมูล");
}
// Show result
function showResult(text) {
    if (Array.isArray(text)) {
        document.getElementById("result").innerText = text.join(", ");
    } else {
        document.getElementById("result").innerText = text;
    }
}
