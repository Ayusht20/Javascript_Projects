// script.js
document.getElementById('computeBtn').addEventListener('click', function() {
    var input1 = parseInt(document.getElementById('input1').value);
    var input2 = parseInt(document.getElementById('input2').value);

    // Validate inputs
    if ((input1 !== 0 && input1 !== 1) || (input2 !== 0 && input2 !== 1)) {
        alert("Please enter 0 or 1 for both inputs.");
        return;
    }

    // Add animation classes to inputs
    document.getElementById('input1').classList.add('animate');
    document.getElementById('input2').classList.add('animate');

    // Compute OR gate result
    var output = input1 || input2;
    var outputElement = document.getElementById('output');
    outputElement.textContent = output;

    // Add animation class to output
    outputElement.classList.add('animate');

    // Remove animation classes after animation ends
    setTimeout(function() {
        document.getElementById('input1').classList.remove('animate');
        document.getElementById('input2').classList.remove('animate');
        outputElement.classList.remove('animate');
    }, 300);
});
