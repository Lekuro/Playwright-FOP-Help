// /**
//  * Temporary Email Service
//  * Uses temp-mail.io API to create temporary emails and retrieve confirmation codes
//  */

// export class TempEmailData {
//     private TEMP_MAIL_API = 'https://api.temp-mail.io/request';
//     public email = '';
//     public code = '';

//     /**
//      * Get temporary email address
//      */
//     public async getTemporaryEmail(): Promise<string> {
//         try {
//             const response = await fetch(this.TEMP_MAIL_API, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to create temp email: ${response.status}`);
//             }

//             const data = (await response.json()) as { mail_address: string };
//             this.email = data.mail_address;
//             console.log('📧 Temp email created:', this.email);
//             return this.email;
//         } catch (error) {
//             console.error('❌ Error creating temp email:', error);
//             throw error;
//         }
//     }

//     /**
//      * Get confirmation code from temp email - Simple version
//      */
//     public async getCode(): Promise<string> {
//         if (!this.email) {
//             throw new Error('Email not set. Call getTemporaryEmail() first');
//         }

//         try {
//             // Wait for email
//             console.log('⏳ Waiting for confirmation email (5 seconds)...');
//             await new Promise((resolve) => setTimeout(resolve, 5000));

//             // Get emails
//             const response = await fetch(`${this.TEMP_MAIL_API}?mail=${this.email}`);

//             if (!response.ok) {
//                 throw new Error(`Failed to get inbox: ${response.status}`);
//             }

//             const emails = (await response.json()) as {
//                 mail_html: string;
//                 mail_text: string;
//             }[];

//             if (!emails || emails.length === 0) {
//                 throw new Error('No emails received');
//             }

//             // Get latest email
//             const latestEmail = emails[emails.length - 1];
//             const emailContent = latestEmail.mail_html || latestEmail.mail_text;
//             console.log('📬 Email received');

//             // Extract code
//             const codeMatch = emailContent.match(/code=([a-zA-Z0-9\-]+)/);
//             this.code = codeMatch?.[1] || '';

//             if (!this.code) {
//                 throw new Error('Could not extract confirmation code');
//             }

//             console.log('✅ Code extracted:', this.code);
//             return this.code;
//         } catch (error) {
//             console.error('❌ Error getting code:', error);
//             throw error;
//         }
//     }
// }
