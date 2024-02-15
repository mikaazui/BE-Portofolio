import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import fileService from "../services/fileService.js";
import { isProfile } from "../validation/profileValidation.js";
import projectController from "./projectController.js";
import blogController from "./blogController.js";
import educationController from "./educationController.js";
import experienceController from "./experienceController.js";
import skillController from "./skillController.js";
import dayjs from "dayjs";
const get = async (req, res, next) => {
  try {
    //cek database
    let data = await Prisma.profile.findFirst();
    //if ada > kirim data asli
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    //get data profile dari database. findFirst
    const profile = await Prisma.profile.findFirst();

    //collect data & validate
    //check
    let data = req.body;
    //add avatar
    if (req.file) {
      const avatar = "/" + req.file.path.replaceAll("\\", "/");
      data.avatar = avatar;
    }

    //validate
    data = Validate(isProfile, data);
    console.log("profile====================");
    console.log(data);
    // throw new Error ('test')

    let dataProfile = {};
    if (!profile) {
      //jika null > create data baru
      let dataProfile = await Prisma.profile.create({
        data,
      });
    }
    if (profile) {
      //jika ada isinya ? update data yang ada
      //isi dari hasil update
      dataProfile = await Prisma.profile.update({
        where: {
          email: profile.email,
        },
        data,
      });
      //hapus poto lama
      const avatar_lama = profile.avatar;
      const avatar_baru = dataProfile.avatar;
      if (avatar_lama) {
        if (avatar_lama != avatar_baru) {
          await fileService.removeFile(avatar_lama);
        }
      }
    }

    res.status(200).json({
      message: "berhasil update data profile secara keseluruhan bedasarkan id",
      data: profile,
    });
  } catch (error) {
    //jika error dan ada file > hapus file
    if (req.file) {
      //handle buang file
      fileService.removeFile(req.file.path);
    }

    next(error);
  }
};

const portofolio = async (req, res, next) => {
  try {
    //ambil data profile
    const profile = await getProfile();
    //extract variable data > variable project
    //menghasilkan variable project

    //ambil data experience
    const experiences = await experienceController.getExperiences();
    //ambil data education
    const educations = await educationController.getEducations();
    //ambil data skill by category
    const skills = await skillController.handleSkillByCategory();
    //ambil data project // 4 data saja
    const { data: projects } = await projectController.getByPage(1, 4);
    //ambil data blog
    const { data: blogs } = await blogController.getByPage(1, 4);

    //hitung tahun pengalaman kerja
    //ambil project pertama array terakhir
    if (projects.length) {
      const firstProject = projects.findLast((p) => p.id);
      const firstProjectDate = dayjs(firstProject.startDate);
      profile.year_of_experience = dayjs().diff(firstProjectDate, "year");
      profile.month_of_experience = dayjs().diff(firstProjectDate, "month");
    } else {
      profile.year_of_experience = 0;
      profile.month_of_experience = 0;
    }

    //hitung jumlah project
    profile.count_project = projects.length;

    res.status(200).json({
      profile,
      experiences,
      educations,
      skills,
      projects,
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    //cek database
    let profile = await Prisma.profile.findFirst();

    //if kosong > kirim data dummy
    if (!profile) {
      //buat data dummy disini
      profile = {
        email: "dummyexample@.com",
        firstName: "-",
        lastName: "-",
        dob: "1900-01-01",
        job: "-",
        address: "-",
        country: "-",
        city: "-",
      };
    }

    return profile;
  } catch (error) {
    next(error);
  }
};

export default {
  get,
  put,
  portofolio,
};
