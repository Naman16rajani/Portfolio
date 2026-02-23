export async function downloadPdf(id: string): Promise<void> {
  if (id !== 'resume') return
  try {
    const res = await fetch('/api/resume-pdf')
    const { url } = await res.json()
    if (url) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Naman-Rajani.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}
