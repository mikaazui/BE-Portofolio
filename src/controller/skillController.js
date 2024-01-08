import { Prisma } from "../application/prisma.js"
import { isSkill } from "../validation/skillValidation.js"
import { Validate } from "../application/validate.js"

const getAll = (req, res, next) => {
  try {
    const data = Prisma.skills.findMany()
    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
    })


  } catch (error) {
    next(error)

  }

}
const get = (req, res, next) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman skills',
  })

}

const post = async (req, res, next) => {
  try {
    let data = req.body
    data = Validate(isSkill, data)

    const category_id = await create_or_find_skill_category(data.category)

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

const create_or_find_skill_category = async (title) => {
  //kalo gaada > category
  //kalo ada > pake return id

  //find categoty
  const category = await Prisma.SkillCategory.findFirst({
    where: {
      title: title
    }
  });

  //jika ada langusng return id
  if (category) return category.id
  //or create new category

  const newCategory = await Prisma.SkillCategory.create({
    data: {
      title: title
    }
  });

  //jika ada >return id
  return newCategory.id
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