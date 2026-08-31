const checkPlacement = require("./placementchecker");


// TEST 1: Correct region

const result1 = checkPlacement(
    {
        region: "principal_display_panel",
        confidence: 0.92
    },
    "principal_display_panel"
);

console.log("TEST 1:");
console.log(result1);


// TEST 2: Wrong region

const result2 = checkPlacement(
    {
        region: "back_panel",
        confidence: 0.92
    },
    "principal_display_panel"
);

console.log("\nTEST 2:");
console.log(result2);


// TEST 3: Region information missing

const result3 = checkPlacement(
    {
        text: "Declaration",
        confidence: 0.92
    },
    "principal_display_panel"
);

console.log("\nTEST 3:");
console.log(result3);