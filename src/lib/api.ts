const BASE_URL = "https://nanopixel.vercel.app";

// GET REQUEST
export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

export async function postAPI(endpoint: string, data: any) {
  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  console.log("DEBUG API RESPONSE:", text);
  if (!res.ok) throw new Error(text || "Request Failed");
  return text ? JSON.parse(text) : {};
}

// PRODUCTS
export const getProducts = () => fetchAPI("/products/");

// Top artist
export const getTopArtists = () => fetchAPI("/topartist/");

// ARTISTS
export const getArtists = () => fetchAPI("/artist/");

// SINGLE PRODUCT
export const getProduct = (id: number) => fetchAPI(`/products/${id}`);

// SIGNUP
export const registerUser = (data: any) =>
  postAPI("/register/", {
    username: data.name,
    email: data.email,
    password: data.password,
  });

// ✅ LOGIN — JWT token return karta hai (access + refresh)
export const loginUser = async (data: { username: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/api/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: data.username, password: data.password }),
  });
  const json = await res.json();
  console.log("LOGIN RESPONSE:", json);
  if (!res.ok) throw new Error(json?.detail || "Login failed");
  return { access: json.access, refresh: json.refresh };
};

export async function postAdminAPI(endpoint: string, data: any) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  console.log("ADMIN RESPONSE:", text);
  if (!res.ok) throw new Error(text || "Admin Request Failed");
  return text ? JSON.parse(text) : {};
}

export const addProduct = (data: any) =>
  postAdminAPI("/admin/shop/product/", data);