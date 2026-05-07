import React, { useRef } from 'react'
import styles from './LogoUpload.module.css'

export default function LogoUpload({ logo, onLogoChange }) {
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Only allow image files
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, etc.)')
      return
    }

    // Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      onLogoChange(ev.target.result) // base64 string
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onLogoChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const fakeEvent = { target: { files: [file] } }
      handleFileChange(fakeEvent)
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  return (
    <div className={styles.wrapper}>
      {logo ? (
        <div className={styles.preview}>
          <img src={logo} alt="Business logo" className={styles.logoImg} />
          <button className={styles.removeBtn} onClick={handleRemove} title="Remove logo">
            ✕ Remove
          </button>
        </div>
      ) : (
        <div
          className={styles.dropzone}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className={styles.icon}>⬆</div>
          <div className={styles.text}>Click or drag to upload logo</div>
          <div className={styles.hint}>PNG, JPG, SVG · Max 2MB</div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
