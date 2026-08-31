function evaluateVerdict(results) {

    let passedRules = 0;
    let failedRules = 0;

    const failures = [];

    for (const result of results) {

        if (result.passed) {

            passedRules++;

        } else {

            failedRules++;

            failures.push({
                rule_id: result.rule_id,
                severity: result.severity,
                clause_citation: result.clause_citation,
                confidence: result.confidence
            });
        }
    }

    let verdict;

    const hasSubstantiveFailure = failures.some(
        failure => failure.severity === "substantive"
    );

    const hasCosmeticFailure = failures.some(
        failure => failure.severity === "cosmetic"
    );

    if (hasSubstantiveFailure) {
        verdict = "NON_COMPLIANT";
    } else if (hasCosmeticFailure) {
        verdict = "COMPLIANT_WITH_WARNINGS";
    } else {
        verdict = "COMPLIANT";
    }

    return {
        verdict: verdict,
        totalRules: results.length,
        passedRules: passedRules,
        failedRules: failedRules,
        failures: failures
    };
}

module.exports = evaluateVerdict;