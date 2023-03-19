const buttonsDiv = document.querySelector(
  '.tiktok-otme0h-DivShareFollowContainer'
)
const username = document.querySelector('[data-e2e="user-title"]').innerText

const anchorFileDownload = document.createElement('a')
const button = document.createElement('button')

button.innerText = 'Get Links'
anchorFileDownload.innerText = 'Download Links'

button.classList.add('btn-get__urls')
anchorFileDownload.classList.add('btn-download__urls')

buttonsDiv.appendChild(button)

button.addEventListener('click', () => {
  let userPostItemList = document.querySelector(
    '[data-e2e="user-post-item-list"]'
  )

  const userPostItemListContent = userPostItemList.innerHTML

  const urls = extractUrlsFromHtml(userPostItemListContent)
  const uniqueUrls = getUniqueUrls(urls)
  const formattedUrls = formatUrls(uniqueUrls)

  saveUrlsToFile(formattedUrls, username)
})

function extractUrlsFromHtml(html) {
  const regex = /<a href="(.+?)"/g
  const urls = []
  let match

  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1])
  }

  return urls
}

function getUniqueUrls(urls) {
  return [...new Set(urls)]
}

function formatUrls(urls) {
  return urls.join('\n')
}

function saveUrlsToFile(urls, username) {
  const blob = new Blob([urls], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  anchorFileDownload.href = url
  anchorFileDownload.download = `${username}-urls.txt`
  anchorFileDownload.click()
}
