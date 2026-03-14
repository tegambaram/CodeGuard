export async function fetchJavaResults() {
    const response = await fetch("/results.json");
    const data = await response.json();
    return data;
}