import fetch from 'node-fetch' // nếu môi trường cần

export default async function handler(req, res) {
  const { userId } = req.query

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' })
  }

  const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!LINE_CHANNEL_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Missing LINE_CHANNEL_ACCESS_TOKEN' })
  }

  try {
    const response = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
      }
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: 'LINE API error' })
    }

    const data = await response.json()
    // data có: displayName, userId, pictureUrl, statusMessage

    return res.status(200).json({ displayName: data.displayName })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
