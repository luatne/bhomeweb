import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Chỉ hỗ trợ phương thức GET' })
  }

  const userId = req.query.userId

  if (!userId) {
    return res.status(400).json({ error: 'Thiếu userId' })
  }

  try {
    const response = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
      }
    })

    const { displayName, pictureUrl } = response.data

    res.setHeader('Access-Control-Allow-Origin', '*') // ✅ CORS cho phép tất cả
    res.status(200).json({
      userId,
      displayName,
      pictureUrl
    })
  } catch (err) {
    console.error('Lỗi gọi LINE API:', err.response?.data || err.message)
    res.status(500).json({ error: 'Không thể lấy thông tin người dùng từ LINE' })
  }
}
