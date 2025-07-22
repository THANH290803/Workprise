import axios from "axios"

const LOCAL_URL = "http://localhost:5001/api"
const PROD_URL = "https://workprise.onrender.com/api"

const api = axios.create({
  baseURL: LOCAL_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // Nếu là lỗi mạng và chưa retry
    if (
      (error.code === "ECONNREFUSED" || error.message?.includes("Network Error")) &&
      !originalRequest._retry
    ) {
      console.warn("⚠️ Localhost lỗi. Đang chuyển sang server Railway...")

      // Đánh dấu tránh retry lặp vô hạn
      originalRequest._retry = true

      // ✅ Ghi đè baseURL thành PROD_URL tại request retry
      originalRequest.baseURL = PROD_URL

      const start = performance.now()
      try {
        const result = await api.request(originalRequest) // sẽ hiển thị trong F12 Network
        const end = performance.now()
        console.info(`⏱️ Chuyển sang Railway mất: ${(end - start).toFixed(2)}ms`)
        return result
      } catch (fallbackError) {
        console.error("❌ Gọi fallback cũng lỗi:", fallbackError)
        return Promise.reject(fallbackError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
