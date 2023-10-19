window.addEventListener('load', () => {
  const urlInput = document.getElementById('url-input')

  urlInput.addEventListener('change', async (e) => {
    try {
      const stuff = await window.electronAPI.pageLoadRequest(e.target.value)
      alert(stuff)
    } catch (e) {
      alert(e)
    }
  })
})
