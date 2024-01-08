import { Prisma } from "@prisma/client"

const getAll = (req, res) => {
  try {
    const data = Prisma.skills.findMany()
    res.status(200).json({
        message: 'berhasil masuk ke halaman skills',
      })
        
    
  } catch (error) {
    
  }
  
}
const get = (req, res) => {
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })
  
  }

const post = (req, res) => {
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })
  
  }

const put = (req, res) => {
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })
  
  }

const patch = (req, res) => {
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })
  
  }

const remove = (req, res) => {
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })
  
  }

export default {
    get,
    getAll,
    post,
    put,
    patch,
    remove
}