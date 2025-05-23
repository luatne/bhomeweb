import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/api/line-profile', async (req, res) => {
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

    res.json({
      userId,
      displayName,
      pictureUrl
    })
  } catch (err) {
    console.error('Lỗi gọi LINE API:', err.response?.data || err.message)
    res.status(500).json({ error: 'Không thể lấy thông tin người dùng từ LINE' })
  }
})

app.listen(port, () => {
  console.log(`API đang chạy tại http://localhost:${port}`)
})
