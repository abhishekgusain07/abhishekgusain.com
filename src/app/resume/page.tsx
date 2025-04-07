import { LiaDownloadSolid } from "react-icons/lia";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";

const ResumePage = () => {
    return (
        <main className="mx-auto max-w-screen-md px-5 py-24 flex flex-col">
            {/* Header Section with Back Link */}
            <div className="mb-8">
                <Link 
                    href="/" 
                    className="inline-flex items-center text-sm text-neutral-6 dark:text-neutral-dark-6 hover:text-primary transition-all mb-6"
                >
                    <IoArrowBackOutline className="mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl font-bold tracking-tight text-neutral-9 dark:text-neutral-dark-9 mb-2">Resume</h1>
                <p className="text-lg text-neutral-7 dark:text-neutral-dark-7 tracking-wide">
                    Here's a brief overview of my professional journey
                </p>
            </div>
            
            {/* Resume Viewer */}
            <div className="rounded-xl overflow-hidden border border-neutral-3 dark:border-neutral-dark-3 shadow-sm mb-8">
                <iframe
                    src="/docs/Resume.pdf"
                    width="100%"
                    height="700px"
                    className="bg-white"
                    title="Abhishek's Resume">
                </iframe>
            </div>

            {/* Download Section */}
            <div className="rounded-xl bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent p-6 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl font-semibold text-neutral-9 dark:text-neutral-dark-9 mb-2">Download Resume</h3>
                    <p className="text-sm text-neutral-7 dark:text-neutral-dark-7">
                        If you prefer a more traditional format, you can download the PDF version
                    </p>
                </div>
                
                <a
                    href="/docs/Resume.pdf"
                    download="Abhishek_Gusain_Resume.pdf"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg dark:bg-white bg-black text-white dark:text-black hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 font-medium"
                >
                    <LiaDownloadSolid className="text-lg" />
                    Download PDF
                </a>
            </div>
        </main>
    )
}

export default ResumePage;