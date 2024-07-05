import Head from 'next/head';

const PrivacyPolicy = () =>
{
    return (
        <>
            <style jsx global>{
                `
                    p,li
                    {
                    font-size:1.2rem
                    }

                    .dark p ,.dark li{
                    color:white;
                    }
`
            }</style>
            <Head>
                <title>Privacy Policy | CodeWithRafay</title>
                <meta name="description" content="Read CodeWithRafay's privacy policy to understand how we collect, use, and protect your personal information. Your privacy is important to us." />
                <link rel="canonical" href="https://www.codewithrafay.com/privacy" />
                <meta name="keywords" content="privacy policy, data protection, CodeWithRafay terms, legal information"></meta>
            </Head>


            <div className=" bg-gray-100 md:px-40 md:py-14 px-4 py-10 rounded-lg shadow-lg dark:bg-slate-800 dark:text-white">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy for CodeWithRafay</h1>

                <p className="text-lg mb-4">Last updated: July 1, 2024</p>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Personal Identification Information</h2>
                    <p className="text-gray-800">
                        We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, and in connection with other activities, services, features, or resources we make available on our Site.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Non-Personal Identification Information</h2>
                    <p className="text-gray-800">
                        We may collect non-personal identification information about Users whenever they interact with our Site. This may include the browser name, the type of computer, and technical information about Users&apos; means of connection to our Site.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Web Browser Cookies</h2>
                    <p className="text-gray-800">
                        Our Site may use cookies to enhance User experience. Users&apos; web browsers place cookies on their hard drives for record-keeping purposes and sometimes to track information about them.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">How We Use Collected Information</h2>
                    <ul className="list-disc list-inside text-gray-800">
                        <li>To run and operate our Site</li>
                        <li>To improve customer service</li>
                        <li>To personalize user experience</li>
                        <li>To improve our Site</li>
                        <li>To process payments</li>
                        <li>To send periodic emails</li>
                        <li>To manage a promotion, survey, or other Site feature</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Sharing Your Personal Information</h2>
                    <p className="text-gray-800">
                        We do not sell, trade, or rent Users&apos; personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and advertisers.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Third-party Websites</h2>
                    <p className="text-gray-800">
                        Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties. We do not control the content or links that appear on these sites.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Compliance with Children&apos;s Online Privacy Protection Act</h2>
                    <p className="text-gray-800">
                        Protecting the privacy of the very young is especially important to us. For that reason, we never collect or maintain information at our Site from those we actually know are under 13, and no part of our website is structured to attract anyone under 13.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                    <p className="text-gray-800">
                        CodeWithRafay has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Contacting Us</h2>
                    <p className="text-gray-800">
                        If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.
                    </p>
                </section>
            </div>

        </>
    );
};

export default PrivacyPolicy;
