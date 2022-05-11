import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepositories } from "../repositories/feedbacks-repositories";

interface SubmitFeebackUseCaseRequest {
    type: string;
    comment: string;
    screenshot: string;
}


export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRespitores: FeedbacksRepositories,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeebackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type) {
            throw new Error('Type is required.')
        } 
        if(!comment) {
            throw new Error('Comment is required.')
        } 
        

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot formart.')
        }

        await this.feedbacksRespitores.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family:sans-sarif; font-size: 16px; color: #222">`,
                `<p>Tipo de feedback ${type}</p>`,
                `<p>Comentario ${comment}</p>`,
                `</div>`
            ].join(`\n`)
        })
    }
}