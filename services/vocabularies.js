const models = require("../models")

const vocabulariesService = {
    async getAllVocabularies () {
        return await models.vocabulary.findAll({
            include: [
                {
                    model: models.partsOfSpeech,
                    as: "PARTS_OF_SPEECH"
                },
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
            order: [['CREATED_AT', 'ASC']],
        })
    },

    async getVocabularyById (id) {
        return await models.vocabulary.findByPk(id)
    },

    async createVocabulary ({word, definition, transcription, partsOfSpeechId, unitId, notes}) {
        return await models.vocabulary.create({
            WORD: word,
            DEFINITION: definition,
            TRANSCRIPTION: transcription,
            PARTS_OF_SPEECH_ID: partsOfSpeechId,
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
            PARTS_OF_SPEECH_ID: partsOfSpeechId,
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