import { check, sleep } from "k6";
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export const options = {
    stages: [
        { duration: "10s", target: 20 },
        { duration: "20s", target: 10 },
        { duration: "10s", target: 0 },
    ]
}

export default function() {
    let res = http.get("http://localhost:9999/contagem-pessoas");
    check(res, {
        "is status 200": (r) => r.status === 200,
        "transaction time is OK": (r) => r.timings.duration < 200
    });
    sleep(1);
}