import firebase from 'core/firebase'
import loadImage from 'blueimp-load-image'


export function uploadImage(file, path, basename, callback = () => {}) {
  // Define constants
  // This function turns every image into a JPEG
  const contentType = 'image/jpeg'
  const ext = 'jpg'
  const quality = 75
  const maxWidth = 1600
  const maxHeight = 1600

  // The promise resolves to firebase's UploadTask
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const sourceImage = new Image()
      sourceImage.onload = (event) => {
        // First, create a canvas on which we'll draw
        const canvas = document.createElement('canvas')
        const sourceWidth = sourceImage.naturalWidth || sourceImage.width
        const sourceHeight = sourceImage.naturalHeight || sourceImage.height

        // Resize the image
        // FIXME the resizing here is very simple and bad bad bad
        const scale = Math.min(
          (maxWidth || sourceWidth) / sourceWidth,
          (maxHeight || sourceHeight) / sourceHeight
        )
        const destWidth = (scale < 1 ? sourceWidth * scale : sourceWidth)
        const destHeight = (scale < 1 ? sourceHeight * scale : sourceHeight)

        canvas.width = destWidth
        canvas.height = destHeight

        // Transform canvas orientation according to EXIF data of the original file
        transformOrientation(file, canvas)
          .then(canvas => {
            // Draw an image on the canvas
            const ctx = canvas.getContext('2d')
            ctx.drawImage(sourceImage, 0, 0, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight)

            // Convert the canvas to base64-encoded image
            const dataURL = canvas.toDataURL(contentType, quality/100)
            const imgBase64 = dataURL.split(',')[1]
            const metadata = {
              contentType
            }

            // Upload the image
            const ref = firebase.storage().ref(`${path}/${basename}.${ext}`)
            const uploadTask = ref.putString(imgBase64, 'base64', metadata)
            callback(uploadTask)
            resolve(uploadTask)
          })
      }

      sourceImage.src = event.target.result
    }

    reader.readAsDataURL(file)
  })
}

function transformOrientation(file, canvas) {
  return new Promise((resolve) => {
    loadImage.parseMetaData(file, data => {
      const orientation = data.exif[274]

      loadImage.transformCoordinates(canvas, { orientation })

      resolve(canvas)
    })
  })
}
