const checkPresence = require("./presencechecker");
const checkConditionalPresence = require("./conditionalpresencechecker");
const checkFormat = require("./formatChecker");
const checkFontSize = require("./fontSizeChecker");
const checkPlacement = require("./placementchecker");


function checkCompliance(rules, extractedData) {

    const results = [];

    for (const rule of rules) {

        const result = runCheck(rule, extractedData);

        results.push({
            rule_id: rule.rule_id,
            passed: result.passed,
            confidence: result.confidence,
            reason: result.reason,
            skipped: result.skipped || false,
            severity: rule.severity,
            clause_citation: rule.clause_citation
        });
    }

    return results;
}


function runCheck(rule, extractedData) {

    switch (rule.check_type) {

        case "presence":

            return checkPresence(
                extractedData[rule.field]
            );


        case "conditional_presence":

            const conditionApplies =
                rule.condition === "imported_product"
                    ? extractedData.isImported
                    : false;

            return checkConditionalPresence(
                extractedData[rule.field],
                conditionApplies
            );


        case "format":

            return checkFormat(
                extractedData[rule.field],
                rule.format_type
            );


        case "font_size":

            return checkFontSize(
                extractedData[rule.field],
                rule.minimum_mm
            );


        case "placement":

            return checkPlacement(
                extractedData[rule.field],
                rule.expected_region
            );


        default:

            return {
                passed: false,
                confidence: 0,
                reason: "Unsupported check type",
                skipped: false,
                error: "Unsupported check type"
            };
    }
}


module.exports = {
    runCheck,
    checkCompliance
};