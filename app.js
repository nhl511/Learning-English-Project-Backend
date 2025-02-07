const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const topicsRouter = require('./routes/topics');
const curriculumsRouter = require('./routes/curriculums')
const gradesRouter = require("./routes/grades")
const unitsRouter = require("./routes/units");
const partsOfSpeechRouter = require("./routes/partsOfSpeech");
const vocabulariesRouter = require("./routes/vocabularies")
const authRouter = require("./routes/auth");
const app = express();
const cors = require('cors');

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/api/auth", authRouter)
app.use('/api/users', usersRouter);
app.use('/api/topics', topicsRouter)
app.use('/api/curriculums', curriculumsRouter)
app.use('/api/grades', gradesRouter);
app.use("/api/units", unitsRouter)
app.use("/api/parts-of-speech", partsOfSpeechRouter)
app.use("/api/vocabularies", vocabulariesRouter)

module.exports = app;
