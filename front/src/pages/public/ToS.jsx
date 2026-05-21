export default function ToS() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16 text-(--text-website)">
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: May 2025</p>

            <section className="flex flex-col gap-8 text-sm leading-7 text-gray-300">
                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By creating an account and using madebyjoao.fr (the "Service"), you agree to be bound by
                        these Terms of Service. If you do not agree to these terms, do not use the Service.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">2. Description of Service</h2>
                    <p>
                        madebyjoao.fr is a portfolio builder platform that allows registered users to create and
                        publish personal portfolios, showcase projects and certificates, and share their
                        professional profile via a unique public URL.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">3. Account Registration</h2>
                    <p>
                        You must provide accurate and complete information when registering. You are responsible
                        for maintaining the confidentiality of your account credentials. You may not share your
                        account with others or create accounts on behalf of third parties without authorization.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">4. User Content</h2>
                    <p>
                        You retain ownership of all content you upload (images, text, files). By uploading
                        content you grant us a limited, non-exclusive licence to store and display it as part of
                        your portfolio. You are solely responsible for ensuring your content does not infringe
                        third-party rights and does not contain harmful, illegal, or offensive material.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">5. Acceptable Use</h2>
                    <p>You agree not to use the Service to:</p>
                    <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                        <li>Upload malicious code or attempt to compromise platform security.</li>
                        <li>Impersonate another person or entity.</li>
                        <li>Distribute spam, unsolicited messages, or misleading content.</li>
                        <li>Violate any applicable local, national, or international law.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">6. Storage & Uploads</h2>
                    <p>
                        Uploaded files (images, CV) are stored on our servers. We reserve the right to impose
                        file-size limits and to remove content that violates these terms. We do not guarantee
                        indefinite storage.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">7. Privacy</h2>
                    <p>
                        We collect only the data necessary to operate the Service (email, username, portfolio
                        content). We do not sell your data to third parties. Your public portfolio is accessible
                        to anyone with your portfolio URL; content marked private is not displayed publicly.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">8. Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate accounts that violate these terms, without
                        prior notice. You may delete your account at any time by contacting us, after which your
                        data will be removed within 30 days.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">9. Disclaimer of Warranties</h2>
                    <p>
                        The Service is provided "as is" without warranties of any kind. We do not guarantee
                        uptime, accuracy, or fitness for a particular purpose. Use the Service at your own risk.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">10. Changes to These Terms</h2>
                    <p>
                        We may update these Terms from time to time. Continued use of the Service after changes
                        are posted constitutes your acceptance of the revised Terms. We will indicate the date of
                        the last update at the top of this page.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-2">11. Contact</h2>
                    <p>
                        For any questions about these Terms, contact us at{" "}
                        <a
                            href="mailto:joao@madebyjoao.fr"
                            className="underline hover:text-white transition-colors"
                        >
                            joao@madebyjoao.fr
                        </a>
                        .
                    </p>
                </div>
            </section>
        </main>
    );
}
