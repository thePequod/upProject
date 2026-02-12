import "dotenv/config"

const base = "https://api.up.com.au/api/v1"
const token = process.env.UP_TOKEN;
if (!token) throw new Error("Missing UP_TOKEN in .env");


// Generic function
async function upGet(path) {
  const res = await fetch(`${base}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Up API error ${res.status}: ${body}`);
  }

  return res.json(); // resolves to a JS object
}


// Endpoint functions
export async function getAccounts() {
  return upGet("/accounts");
}

export async function getCategories() {
  return upGet("/categories");
}

export async function getAccountId() {
    const accounts = await getAccounts();
    const accountId = accounts?.data?.[0]?.id;
    if (!accountId) {
        throw new Error("No account ID found");
    }
    console.log(accountId);
}

export async function getTransactions(accountId, { pageSize = 25 } = {}) {
  if (!accountId) throw new Error("accountId is required");
  return upGet(`/accounts/${accountId}/transactions?page[size]=${pageSize}`);
}