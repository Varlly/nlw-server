import express, { Request, Response } from 'express'

import { NodemailerMailAdpter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepositories } from './repositories/prisma/prisma-freedbacks-repositories';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req: Request, res: Response) => {
    const {type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepositories()
    const nodemailerMailAdpter = new NodemailerMailAdpter()
    
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdpter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })
    
    res.status(201).send()
})