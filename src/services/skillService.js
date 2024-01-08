import { Prisma } from "../application/prisma.js";


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

  export default {
    create_or_find_skill_category
  }