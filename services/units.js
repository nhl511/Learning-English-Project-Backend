const models = require('../models');

const unitsService = {
    async getAllUnits() {
        return await models.unit.findAll({
            include: [
                {
                    model: models.grade,
                    as: 'GRADE',
                    include: [
                        {
                            model: models.curriculum,
                            as: 'CURRICULUM',
                        }
                    ],
                    attributes: { exclude: ['CURRICULUM_ID'] },

                }
            ],
            attributes: { exclude: ['GRADE_ID'] },
            order: [['CREATED_AT', 'ASC']],
        });
    },

    async getUnitsActive(){
        return await models.unit.findAll({
            where: {
                ACTIVE: true
            },
            order: [['CREATED_AT', 'ASC']],
        })
    },

    async getUnitActiveByGradeId(id) {
        return await models.unit.findAll({
            where: {
                GRADE_ID: id,
                ACTIVE: true
            },
            order: [['CREATED_AT', 'ASC']],
        })
    },

    async getUnitById(id) {
        return await models.unit.findOne({ where: { ID: id } });
    },

    async createUnit({unitNumber, unitName, gradeId}) {
        return await models.unit.create({
            UNIT_NUMBER: unitNumber,
            UNIT_NAME: unitName,
            GRADE_ID: gradeId,
        })
    },

    async updateUnit({unitNumber, unitName, gradeId, id}) {
        return await models.unit.update({
            UNIT_NUMBER: unitNumber,
            UNIT_NAME: unitName,
            GRADE_ID: gradeId,
        },{
            where: {
                ID: id
            }
        })
    },

    async deleteUnit(id) {
        return await models.unit.destroy({where: {ID: id}})
    },

    async countUnits(){
        return await models.unit.count()
    },

    async countUnitsActive(){
        return await models.unit.count({
            where: {
                ACTIVE: true
            }
        })
    },

    async countUnitsActiveByGradeId(id){
        return await models.unit.count({
            where: {
                GRADE_ID: id,
                ACTIVE: true
            }
        })
    },

    async updateUnitStatus({id, active}){
        return await models.unit.update({
            ACTIVE: active
        },{
            where: {ID: id}
        })
    },

    async findUnitByGradeId({unitNumber, gradeId}){
        return await models.unit.findOne({where: {UNIT_NUMBER: unitNumber, GRADE_ID: gradeId}})
    }
}

module.exports = unitsService