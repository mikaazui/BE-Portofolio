import { Prisma } from "../application/prisma.js"
import { isSkill } from "../validation/skillValidation.js"
import { Validate } from "../application/validate.js"
import skillService from "../services/skillService.js"
import { isID } from "../validation/mainValidation.js"

const getAll = async (req, res, next) => {
  try {
    const data = await Prisma.skill.findMany({
      include: {
        category: true
      }
    })
    console.log(data)
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
      data: data
    })


  } catch (error) {
    next(error)

  }

}
const get = async (req, res, next) => {
  try {
    let id = req.params.id
    id = Validate(isID, id)
  
    const skill = await Prisma.skill.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    })
  
    //handle not found
    if (skill == null) {
      throw new ResponseError(404, `blog ${id} not found`)
    }
  
    res.status(200).json({
      message: 'berhasil masuk ke halaman skill (berdasakan id)',
      id: id,
      data: skill
  
    });
  } catch (error) {
    
  }
 
}

const post = async (req, res, next) => {
  try {
    let data = req.body
    data = Validate(isSkill, data)

    // const category_id = await create_or_find_skill_category(data.category)
    const category_id = await skillService.create_or_find_skill_category(data.category)

    const insert_data = {
      title: data.title,
      skillCategoryId: category_id
    };
    const skill_data = await Prisma.skill.create({
      data: insert_data
    })
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
      data: skill_data
    })


  } catch (error) {
    next(error)
  }

}

const put = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })

  } catch (error) {
    next(error)
  }

}

const patch = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })

  } catch (error) {
    next(error)
  }

}

const remove = (req, res, next) => {
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