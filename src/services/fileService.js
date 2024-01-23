import fs from 'fs/promises';
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
        throw (error)
      }
}

export default{
    createFolder,
    removeFile
}