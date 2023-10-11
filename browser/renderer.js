window.addEventListener('load', () => {
  const urlInput = document.getElementById('url-input')

  urlInput.addEventListener('change', async (e) => {
    const stuff = await window.electronAPI.pageLoadRequest(e.target.value)
    alert(stuff)
  })
})
