import { Prisma } from "../application/prisma.js";


const create_or_find_skill_category = async (title) => {
  //kalo gaada > category
  //kalo ada > pake return id

  //find categoty
  const category = await Prisma.skillCategory.findFirst({
    where: {
      title: title
    }
  });

  //jika ada langusng return id
  if (category) return category.id
  //or create new category

  const newCategory = await Prisma.skillCategory.create({
    data: {
      title: title
    }
  });

  //jika ada >return id
  return newCategory.id
}

const remove_category = async (previous_skill_id) => {
  const category = await Prisma.skillCategory.findUnique({
    where: {
      id: previous_skill_id
    },
    include: {
      _count: {
        select: {
          Skill: true
        }
      }
    }
  });
  console.log(category)

  // count skill, kalo 0 > hapus
  if (category._count.Skill == 0) {
    await Prisma.skillCategory.delete({
      where: {
        id: previous_skill_id
      }
    });
  }
}

export default {
  create_or_find_skill_category,
  remove_category
}