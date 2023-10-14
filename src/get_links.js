const anchorFileDownload = document.createElement('a')
const button = document.createElement('button')

window.onload = () => {
  const buttonsDivCss = document.querySelector(
    'div.css-1xwagd1-DivShareFollowContainer'
  )

  const buttonsDivTiktok = document.querySelector(
    'div.tiktok-1xwagd1-DivShareFollowContainer'
  )

  console.log(`buttonsDiv: ${buttonsDivCss || buttonsDivTiktok}`)
  const username = document.querySelector('[data-e2e="user-title"]').textContent

  button.innerText = 'Get Links'
  anchorFileDownload.innerText = 'Download Links'

  button.classList.add('btn-get__urls')
  anchorFileDownload.classList.add('btn-download__urls')

  appendCorrectButton(buttonsDivCss)
  appendCorrectButton(buttonsDivTiktok)

  button.addEventListener('click', () => {
    let userPostItemList = document.querySelector(
      '[data-e2e="user-post-item-list"]'
    )

    const userPostItemListContent = userPostItemList.innerHTML

    console.log(userPostItemListContent)
    const urls = extractUrlsFromHtml(userPostItemListContent)
    const uniqueUrls = getUniqueUrls(urls)
    const formattedUrls = formatUrls(uniqueUrls)

    saveUrlsToFile(formattedUrls, username)
  })
}

function appendCorrectButton(buttonsDiv) {
  if (buttonsDiv !== null) {
    buttonsDiv.appendChild(button)
    console.log(`button appended to ${buttonsDiv.innerText}`)
  }
}

function extractUrlsFromHtml(html) {
  const regex = /href="([^"]*)"/g
  const urls = []
  let match

  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1])
  }

  return urls
}

function validateTikTokVideo(url) {
  const regex = /https:\/\/www.tiktok.com\/@[^\/]+\/video\/[^\/]+\/?/
  return regex.test(url)
}

function getUniqueUrls(urls) {
  return [...new Set(urls)]
}

function formatUrls(urls) {
  urls = urls.filter(validateTikTokVideo)
  return urls.join('\n')
}

function saveUrlsToFile(urls, username) {
  const blob = new Blob([urls], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  anchorFileDownload.href = url
  username = username.replace(/\s/g, '')
  anchorFileDownload.download = `${username}-urls.txt`
  anchorFileDownload.click()
}
