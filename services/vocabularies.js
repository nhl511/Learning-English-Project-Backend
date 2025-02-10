const models = require("../models")
const {Sequelize} = require("sequelize");

const vocabulariesService = {
    async getAllVocabularies ({page, pageSize}) {
        return await models.vocabulary.findAll({
            include: [
                {
                    model: models.unit,
                    as: "UNIT",
                    include: [
                        {
                            model: models.grade,
                            as: "GRADE",
                            include: [
                                {
                                    model: models.curriculum,
                                    as: "CURRICULUM",
                                }
                            ],
                            attributes: { exclude: ['CURRICULUM_ID'] },
                        }
                    ],
                    attributes: { exclude: ['GRADE_ID'] },
                }
            ],
            attributes: { exclude: ['PARTS_OF_SPEECH_ID', "UNIT_ID"] },
            order: [
                [Sequelize.col('UNIT.GRADE.CURRICULUM.NAME'), 'ASC'],
                [Sequelize.col('UNIT.GRADE.GRADE_NUMBER'), 'ASC'],
                [Sequelize.col('UNIT.UNIT_NUMBER'), 'ASC'],
                ['WORD', 'ASC']
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
        })
    },

    async getVocabularyById (id) {
        return await models.vocabulary.findByPk(id)
    },

    async createVocabulary ({word, definition, transcription, unitId, notes}) {
        return await models.vocabulary.create({
            WORD: word,
            DEFINITION: definition,
            TRANSCRIPTION: transcription,
            UNIT_ID: unitId,
            NOTES: notes,
        })
    },

    async createManyVocabulary(vocabularies){
        return await models.vocabulary.bulkCreate(vocabularies)
    },

    async updateVocabulary ({id, word, definition, transcription, partsOfSpeechId, unitId, notes}) {
        return await models.vocabulary.update({
            WORD: word,
            DEFINITION: definition,
            TRANSCRIPTION: transcription,
            UNIT_ID: unitId,
            NOTES: notes,
        },{
            where: {ID: id}
        })
    },

    async deleteVocabulary (id) {
        return await models.vocabulary.destroy({where: {ID: id}})
    },

    async updateVocabularyStatus ({id, active}) {
        return await models.vocabulary.update({
            ACTIVE: active
        },{
            where: {ID: id}
        })
    },

    async countVocabularies(){
        return await models.vocabulary.count()
    }
}

module.exports = vocabulariesService