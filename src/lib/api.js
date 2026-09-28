const BASE_URL =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    "http://localhost:3000";

const AI_BASE_URL =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_AI_URL) ||
    "http://212.71.252.129:8111";

async function apiCall(url, {method = "GET", body} = {}) {
    const res = await fetch(url, {
        method,
        headers: {"Content-Type": "application/json"},
        body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) throw new Error(json?.error || `Request failed: ${res.status}`);
    return json;
}

export const api = {
    get: (endpoint, params) => {
        let url = `${BASE_URL}${endpoint}`;
        if (params) {
            const qs = new URLSearchParams(
                Object.entries(params).filter(([, v]) => v != null)
            ).toString();
            if (qs) url += `?${qs}`;
        }
        return apiCall(url);
    },
    post: (endpoint, body) => apiCall(`${BASE_URL}${endpoint}`, {method: "POST", body}),
    put: (endpoint, body) => apiCall(`${BASE_URL}${endpoint}`, {method: "PUT", body}),
    delete: (endpoint) => apiCall(`${BASE_URL}${endpoint}`, {method: "DELETE"}),

    infer: (msgs) =>
        apiCall(`${AI_BASE_URL}/infer`, {
            method: "POST",
            body: {
                messages: (msgs || []).map(({text}, index) => ({
                    seq: index,
                    text,
                })),
                generate_report: true,
            },
        }),
};