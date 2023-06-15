const axios = require('axios')
const cheerio = require('cheerio')

const getAvatar = async (query) => {
  try {
    const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`)

    const $ = cheerio.load(response.data)

    const imageUrls = []
    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src')
      if (imageUrl !== '') {
        imageUrls.push(imageUrl)
      }
    })

    return imageUrls[1]
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

module.exports = getAvatar