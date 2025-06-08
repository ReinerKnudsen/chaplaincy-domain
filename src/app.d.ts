/// <reference types="@sveltejs/kit" />

declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }

    namespace NodeJS {
        interface ProcessEnv {
            SMTP_HOST: string;
            SMTP_PORT: string;
            SMTP_USER: string;
            SMTP_PASS: string;
            SMTP_FROM: string;
        }
    }
}

export {};
