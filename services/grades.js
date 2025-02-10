const models = require("../models")
const {Sequelize} = require("sequelize");


const gradesService = {
    async getAllGrades({page, pageSize}){
        return await models.grade.findAll({
            include: [
                {
                    model: models.curriculum,
                    as: 'CURRICULUM',
                }
            ],
            attributes: { exclude: ['CURRICULUM_ID'] },
            order: [
                [Sequelize.col('CURRICULUM.NAME'), 'ASC'],
                ['GRADE_NUMBER', 'ASC']
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
        })
    },

    async getGradesActive(){
        return await models.grade.findAll({
            where: {
                ACTIVE: true
            },
            order: [
                [Sequelize.col('CURRICULUM.NAME'), 'ASC'],
                ['GRADE_NUMBER', 'ASC']
            ],
        })
    },

    async getGradeActiveByCurriculumId(id){
        return await models.grade.findAll({
            where: {
                CURRICULUM_ID: id,
                ACTIVE: true
            },
            order: [['GRADE_NUMBER', 'ASC']],
        })
    },

    async getGradeById(id){
        return await models.grade.findOne({where:{ID:id}})
    },

    async createGrade({gradeNumber, curriculumId}){
        return await models.grade.create({
            GRADE_NUMBER: gradeNumber,
            CURRICULUM_ID: curriculumId,
        })
    },

    async updateGrade({id, gradeNumber, curriculumId}) {
        return await models.grade.update({
            GRADE_NUMBER: gradeNumber,
            CURRICULUM_ID: curriculumId,
        },{
            where: {ID: id}
        })
    },

    async deleteGrade(id){
        return await models.grade.destroy({where:{ID: id}})
    },

    async countGrades(){
        return await models.grade.count()
    },

    async countGradesActive(){
        return await models.grade.count({
            where: {
                ACTIVE: true
            }
        })
    },

    async countGradesActiveByCurriculumId(id){
        return await models.grade.count({
            where: {
                CURRICULUM_ID: id
            }
        })
    },

    async updateGradeStatus({id, active}){
        return await models.grade.update({
            ACTIVE: active
        },{
            where: {ID: id}
        })
    },

    async findGradeByCurriculum({gradeNumber, curriculumId}){
        return await models.grade.findOne({where: {GRADE_NUMBER: gradeNumber, CURRICULUM_ID: curriculumId}})
    }
}

module.exports = gradesService