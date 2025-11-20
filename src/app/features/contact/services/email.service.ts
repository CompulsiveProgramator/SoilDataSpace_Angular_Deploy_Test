import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private serviceID = 'service_p4mxosb';
  private templateID = 'template_1on1m8g';
  private publicKey = 'QqA-yXOtxRNRrDxOD';

  constructor() {}

  sendEmail(data: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      this.serviceID,
      this.templateID,
      data,
      this.publicKey
    );
  }
}
