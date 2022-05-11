import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

describe('Sumit feedback', () => {
    const createFeedbackSpy = jest.fn();
    const sendMailSpy = jest.fn()

    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy },
        { sendMail: sendMailSpy }
    )

    it('Should be able a submit to feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'qualquer um',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('Should not be able a submit to feedback whitout type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'qualquer um',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow()
    })

    it('Should not be able a submit to feedback whitout comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow()
    })

    it('Should not be able a submit to feedback whit an invalid screeshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'tudo errado',
            screenshot: 'teste.jpeg'
        })).rejects.toThrow()
    })
})