// ============================================================
// CONTACTSECTION.JSX — Contact Page with Form (Day 11-12)
// ============================================================
// A full contact section with a message form, info cards
// (location, hours, email, phone), social links, and
// interactive effects (tilt cards, mouse-follow glow).
//
// THIS IS THE MOST COMPLEX COMPONENT IN THE PROJECT.
// Take your time and build it section by section.
//
// WHAT YOU WILL LEARN:
// - Managing complex form state with useState
// - Form validation and submission handling
// - useRef for DOM references
// - useEffect for global event listeners (mouse tracking)
// - Advanced framer-motion: useMotionValue, useSpring, useTransform
// - Building a reusable TiltCard sub-component
// - SVG icons inline in JSX
// - Conditional rendering for form states (sending, sent, error)
//
// CONCEPTS COVERED:
// - Multiple useState hooks in one component
// - Event handling: onChange, onBlur, onSubmit, onMouseMove
// - Controlled form inputs with validation
// - Async/await with try/catch
// - Component composition (sub-components in same file)
// - Inline styles with dynamic values
//
// ============================================================

// STEP 1: Imports
// From "react": import { useState, useEffect, useRef }
// From "framer-motion": import { motion, useMotionValue, useSpring, useTransform }
// Import UI components: ScrollReveal, StaggerContainer, StaggerItem,
//   Separator, Input (+ Textarea), Button

/* --- YOUR IMPORTS GO HERE --- */
import { useState, useEffect, useRef } from "react";
import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";

import ScrollReveal from "./ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import Separator from "./ui/Separator";
import Input, {Textarea} from "./ui/Input";
import Button from "./ui/Button";

// STEP 2: Contact channels data (outside the component)
// Define an array of contact info objects:
// const contactChannels = [
//   {
//     name: "Visit Our Roastery",
//     icon: <svg>...</svg>,  // Map pin icon
//     gradient: "from-amber-700 to-amber-500",
//     accentColor: "var(--amber)",
//     detail: "Beans Place, Strasburg, CO 80136",
//     action: "Get Directions",
//     href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO"
//   },
//   // Add: Opening Hours, Email Us, Call Us
// ];

/* --- YOUR CONTACT DATA GOES HERE --- */


// STEP 3: TiltCard sub-component (ADVANCED)
// This creates a 3D tilt effect that follows the mouse.
//
// function TiltCard({ children, className, href, target, rel }) {
//   - Use useRef for the card element
//   - useMotionValue(0) for x and y mouse positions
//   - useSpring + useTransform to convert mouse position to rotation
//   - handleMouse: calculate mouse position relative to card
//   - handleLeave: reset to center
//   - Render as <motion.a> if href provided, <motion.div> otherwise
//   - Apply rotateX, rotateY, and transformPerspective styles
// }

/* --- YOUR TILTCARD COMPONENT GOES HERE --- */


// STEP 4: ContactFormInline sub-component
// An animated contact form with validation.
//
// function ContactFormInline() {
//   State:
//     - formData: { name, email, subject, message }
//     - status: null | 'sending' | 'sent' | 'error'
//     - touched: {} (tracks which fields have been visited)
//
//   Handlers:
//     - handleChange: updates formData with spread operator
//     - handleBlur: marks field as touched
//     - handleSubmit: validates, simulates send, updates status
//
//   JSX: <motion.form> with:
//     - Header (title + subtitle)
//     - Name + Email inputs (2-column grid)
//     - Subject input (full width)
//     - Message textarea (full width)
//     - Submit button with 3 states:
//       sending: spinner + "Sending..."
//       sent: checkmark + "Message Sent!"
//       default: "Send Message"
//     - Error message (conditional)
// }

/* --- YOUR CONTACTFORMINLINE COMPONENT GOES HERE --- */


// STEP 5: Create and export ContactSection (main component)
// export default function ContactSection() { ... }
//
// State:
//   - mousePos: { x: 0, y: 0 } for the glowing cursor effect
//   - sectionRef: useRef(null)
//
// useEffect: track mouse position globally
//   window.addEventListener("mousemove", ...)
//
// JSX Structure:
//   <div className="contact-section-wrap" ref={sectionRef}>
//
//     Background effects:
//       - Three animated orbs (div elements)
//       - Grid overlay pattern
//
//     Content (className="contact-inner"):
//       Header:
//         - Animated pill: "Connect & Collaborate"
//         - <h1>: "GET IN" / "TOUCH"
//         - Subtitle paragraph
//         - Separator
//
//       Two-column layout (className="contact-layout"):
//         Left: <ContactFormInline />
//         Right: Contact info cards + social links
//           - Map over contactChannels with TiltCard
//           - Social links row (Instagram, Facebook, X)
//
//     Mouse glow effect:
//       <div className="contact-mouse-glow"
//         style={{ left: mousePos.x - 192, top: mousePos.y - 192 }} />
//   </div>

/* --- YOUR COMPONENT CODE GOES HERE --- */

// Data for the four ways to reach us --> cards.

const contactChannels = [
    {
        name: "Visit Our Roastery",
        icon: (),
        gradient: "from-amber-700 to-amber-500",
        accentColor: "var(--amber)",
        detail: "Beans Place, Strasburg, CO 80136",
        action: "Get Directions",
        href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO"
    },
    {
        name: "Opening Hours",
        icon: (),
        gradient: "from-yellow-700 to-yellow-500",
        accentColor: "#ca8a04",
        detail: "Mon-Fri: 7am-6pm  |  Sat-Sun: 8am-4pm",
        action: "Plan your visit",
        href: "#contact"
    },
    {
        name: "Email Us",
        icon: (),
        gradient: "from-orange-700 to-orange-500",
        accentColor: "#c2410c",
        detail: "hello@thebeansplace.com",
        action: "Send Email",
        href: "mailto:hello@thebeansplace.com" // opens their email app, pre-addressed
    },
    {
        name: "Call Us",
        icon: (),
        gradient: "from-stone-700 to-stone-500",
        accentColor: "#78716c",
        detail: "(303) 555-BEAN",
        action: "Call Now",
        href: "tel:+13035552326" // phone can dial straight from the page
    }
]


function TiltCard({children, className, href, target, rel}){

    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {stiffness: 200, damping: 20});
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {stiffness: 200, damping: 20});



    function handleMouse(e) {
        const rect = ref.current.getBoundingClientRect();

        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    function handleLeave(){
        x.set(0);
        y.set(0);
    };

    const Tag = href ? motion.a : motion.div;

    return (
        <Tag
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{rotateX, rotateY, transformPerspective: 600}}
            className={className}
        >
            {children}
        </Tag>
    )
};



function ContactFormInline(){

    const [fromData, setFormData] = useState({name: "", email: "", subject: "", message: ""});

    const [status, setStatus] = useState(null); // null, sending, sent, error

    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const{name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleBlur = (e) => {
        setTouched((prev) ({...prev, [e.target.name]: true}))
    }

    const handleSubmit = async (e) => {
        //stop the browser reloading the page
        e.preventDefault()

        setTouched({name: true, email: true, subject: true, message: true});

        if(!FormData.name || !FormData.email || !FormData.message) return;

        setStatus("sending...")

        try{

            await new Promise((resolve) => setTimeout(resolve, 1200));
            setStatus("sent");

            setFormData({name: "", email: "", subject: "", message: ""});
            setTouched({});
            setTimeout({} => setStatus(null), 4000);

        }catch{
            setStatus("error");
            setTimeout(() => setStatus(null), 4000)

        }
    }


    return(

        <motion.form
            onSubmit={handleSubmit}
            className="contact-form-card"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: 0.1}}
        >
            <div className="mb-6">
                <h3 className="contact-form-title">Send a Message</h3>
                <p className="contact-form-subtitle">
                    We'd love to hear from you. Fill out the form, and we'll get back within 24 hrs.
                </p>
            </div>

            <div className="contact-form-grid">
                <Input
                    label="Your Name"
                    id="contact-name"
                    name="name"
                    placeholder="John Doe"
                    value={FormData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !FormData.name ? "Name is required" : undefined}
                />
                <Input
                    label="Email Address"
                    id="contact-email"
                    name="email"
                    placeholder="JohnDoe@example.com"
                    value={FormData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !FormData.email ? "Email is required" : undefined}
                />
            </div>

            <div className="mt-4">
                <Input 
                    label="Subject"
                    id="contact-subject"
                    name="subject"
                    placeholde="What's this about?"
                    value={FormData.subject}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-4">
                <Textarea 
                    lable="Message"
                    id="contact-message"
                    name="message"
                    placeholder="Tell us what's on your mind"
                    rows={5}
                    value={FormData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && !FormData.message ? "Message is required" : undefined}
                />
            </div>


        </motion.form>
    )
}


export default function ContactSection(){
    // pointer position in the window
    const [mousePos, setMousePos] = useState({x: 0, y:0});
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({x: e.clientX, y: e.clientY});

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    return (
        <div className="contact-section-wrap" ref={sectionRef}>
            <div className="contact-bg-effects">
                <div className="contact-bg-orb contact-bg-orb--1" />
                <div className="contact-bg-orb contact-bg-orb--2" />
                <div className="contact-bg-orb contact-bg-orb--3" />
                <div className="contact-bg-grid" />
            </div>


            <div className="contact-inner">
                <ScrollReveal animation="fadeUp" className="contact-header">
                    <motion.div
                        className="contact-pill"
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true}}
                    >
                        <span>Connect & Collaborate</span>
                    </motion.div>


                    <h1 className="h1-stack" style={{color: "var(--cream)"}}>
                        Ger in
                        <br />
                        <span className="muted" style={{color: "var(--amber)"}}>
                            Touch
                        </span>
                    </h1>

                    <p className="lead--light" styel={{maxWidth: "52ch", margin: "10px auto 0"}}>
                        Whether you're ordering beans, planning an event, or just want to say hello 
                        we'd love to hear from you.
                    </p>

                    <Separator className="mt-4 mb-2 mx-auto max-w-48" />

                </ScrollReveal>

                <div className="contact-layout">
                    <div className="contact-form-col">
                        <ContactFormInline />
                    </div>

                    <div className="contact-info-col">
                        <StaggerContainer classname="contact-info-cards" staggerDelay={0.1}>
                            {contactChannels.map((channel) => (
                                <StaggerItem key={channel.name} animation="fadeUp">
                                    <TiltCard
                                        href={channel.href}
                                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                                        rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="contact-card-link"
                                    >
                                        <div className="contact-card">
                                            <div 
                                                className="contact-card-accent"
                                                style={{background: channel.accentColor}}
                                            />
                                            <div className="contact-card-content">
                                                <div className={`contact-card-icon bg-gradient-to-br ${channel.gradient}`}>
                                                    {channel.icon}
                                                </div>
                                                <div className="contact-card-text">
                                                    <h3 className="contact-card-title">
                                                        {channel.name}
                                                    </h3>
                                                    <p className="contact-card-detail">
                                                        {channel.detail}
                                                    </p>
                                                </div>
                                                <div className="contact-card-arrow">
                                                    <svg 
                                                        className="w-4 h-4" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24">
                                                            <path 
                                                                strokeLinecap="round" 
                                                                stokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="m17 8l4 4m0 0l-4 4m4-4H3"
                                                            />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="contact-card-shimmer" />
                                        </div>
                                    </TiltCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>



                    </div>
                </div>
            </div>

            <div 
                className="contact-mouse-glow"
                styel={{
                    left: `${mousePos.x - 192}px`,
                    right: `${mousePos.y - 192}px`
                }}
            />
        </div>
    )
}