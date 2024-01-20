import { Prisma } from "../application/prisma.js"
import { isSkill } from "../validation/skillValidation.js"
import { Validate } from "../application/validate.js"
import skillService from "../services/skillService.js"
import { isID } from "../validation/mainValidation.js"
import { ResponseError } from "../error/responseError.js"

const getAll = async (req, res, next) => {
  try {
    const data = await Prisma.skill.findMany({
      include: { category: true }
    });

    res.status(200).json({
      message: 'berhasil masuk ke halaman skills',
      data
    });

  } catch (error) {
    next(error)

  }

}
const get = async (req, res, next) => {
  try {
    let id = req.params.id
    id = Validate(isID, id)

    const data = await Prisma.skill.findUnique({
      where: { id },
      include: { category: true }
    });

    //handle not found
    if (data == null) throw new ResponseError(404, `blog ${id} not found`);


    res.status(200).json({
      message: 'berhasil masuk ke halaman skill (berdasakan id)',
      id, data

    });
  } catch (error) {
    next(error)
  }
};

const post = async (req, res, next) => {
  try {
    let data = req.body
    data = Validate(isSkill, data)

    // const category_id = await create_or_find_skill_category(data.category)
    const category_id = await skillService.create_or_find_skill_category(data.category);

    const insert_data = {
      title: data.title,
      svg: data.svg,
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
};

const put = async (req, res, next) => {
  try {
    let skill = req.body;
    let id = req.params.id;
    //start validate skill
    skill = Validate(isSkill, skill)
    id = Validate(isID, id)

    const currentSkill = await Prisma.skill.findUnique({
      where: { id },
      select: {
        id: true,
        skillCategoryId: true
      }
    });

    // handle not found
    if (!currentSkill) throw new ResponseError(404, `skill ${id} not found`);


    //handle category
    const category_id = await skillService.create_or_find_skill_category(skill.category);

    const data = {
      title: skill.title,
      skillCategoryId: category_id
    };

    const updatedSkill = await Prisma.skill.update({
      where: { id },
      data
    });

    //remove category
    //id category sebelumnya
    const previous_skill_id = currentSkill.skillCategoryId;
    await skillService.remove_category(previous_skill_id);

    res.status(200).json({
      message: `skill ${id} updated successfully`,
      id,
      updatedSkill
    });

  } catch (error) {
    next(error)
  }

}
const remove = async (req, res, next) => {
  try {
    let id = req.params.id;

    id = Validate(isID, id);
    const currentSkill = await Prisma.skill.findUnique({
      where: { id },
      select: {
        id: true,
        skillCategoryId: true
      }
    }
    );

    if (!currentSkill) throw new ResponseError(404, `skill ${id} not found`)
    

    //delete execution

    await Prisma.skill.delete({
      where: { id }
    });
    //remove category
    //id category sebelumnya
    const previous_skill_id = currentSkill.skillCategoryId;
    await skillService.remove_category(previous_skill_id);

    res.status(200).json({
      message: `deleted skill ${id} successfully`,
    });

  } catch (error) {
    next(error)
  };
};

export default {
  get,
  getAll,
  post,
  put,
  remove
}