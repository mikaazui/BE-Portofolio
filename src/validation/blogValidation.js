import joi from 'joi';

const isBlogTitle = joi.string().min(3).max(100).required().label('Title').trim()

const isBlog = joi.object({
    title: isBlogTitle.label('Title'),
    content: joi.string().min(3).required().trim().label('Content')
})

export {
    isBlog,
    isBlogTitle
}