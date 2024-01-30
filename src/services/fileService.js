import fs from 'fs/promises';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      //random rumber w date generator
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //create file ext
      const ext = file.originalname.split('.').pop()
      //final merge 
      cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
      //cara kedua, pilih sesuai selera

      // cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  }
});
const upload = multer({ storage: storage })

const getUploadedPhotos = (req) => {
  const photos = []
  if (req.files) {
      //handle upload
      for (const file of req.files) {
          // add slash to photot
          let photo = '/' + file.path.replaceAll('\\', '/')
          //bikin object berdasaran schema prisma
          photo = {
              path: photo
          }
          photos.push(photo)

      }
  }
  return photos;
}


const createFolder = async (folderName) => {
    try {
        //kalo ada > access folder uploads
        await fs.access(folderName)
      } catch (error) {
        //kalo ga ada > buat folder uploads
        //jika tidak ada, folder akan dibuat saat aplikasi dijalankan (npm run dev)
        await fs.mkdir(folderName)
      }
      

}

const removeFile = async (fileName) => {
    try {
        await fs.rm('./' +  fileName)
      } catch (error) {
        // throw (error)
      }
}

export default{
    createFolder,
    removeFile,
    upload,
    getUploadedPhotos
}