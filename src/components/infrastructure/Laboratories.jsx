// src/components/infrastructure/Laboratories.jsx
import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import "./infrastructure.css";
import ContactFormOnly from "../contact/ContactFormOnly";
import labMain from "../../assets/images/about/about-bg.jpg";
import lab1 from "../../assets/images/infra/lab-1.jpg";
import lab2 from "../../assets/images/infra/lab-2.jpg";
import lab3 from "../../assets/images/infra/lab-3.jpg";
import lab4 from "../../assets/images/infra/lab-4.jpg";
import lab5 from "../../assets/images/infra/lab-5.jpg";
import lab6 from "../../assets/images/infra/lab-6.jpg";


const galleryImages = [lab1, lab2, lab3, lab4, lab5, lab6];

const Laboratories = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length),
            2500
        );
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () =>
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);

    const prevSlide = () =>
        setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

    return (
        <>
            <Back title="Science Laboratories" />

            <section className="infraPage">
                <div className="container">
                    <header className="infraTop">
                        <h1>IMS Science Laboratories</h1>
                        <p>
                            Well‑equipped physics, chemistry and biology labs where students
                            see concepts come alive through safe and guided experiments.
                        </p>
                    </header>

                    <div className="infra-grid">
                        <div className="infra-left">
                            <h3 className="infra-title">Learning by doing</h3>

                            <ul className="infra-list">
                                <li>
                                    <span className="infra-icon">
                                        <i className="fa fa-flask" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h4>Separate subject labs</h4>
                                        <p>
                                            Dedicated labs for physics, chemistry and biology with
                                            age‑appropriate apparatus and models.
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <span className="infra-icon">
                                        <i className="fa fa-lightbulb" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h4>Concept clarity</h4>
                                        <p>
                                            Experiments that help students practically understand
                                            what they learn in textbooks.
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <span className="infra-icon">
                                        <i className="fa fa-user-shield" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h4>Safety first</h4>
                                        <p>
                                            Proper lab rules, supervision and safety gear so
                                            students work with confidence and care.
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <span className="infra-icon">
                                        <i className="fa fa-microscope" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h4>Observation & recording</h4>
                                        <p>
                                            Emphasis on careful observation, noting results and
                                            drawing correct inferences.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="infra-right">
                            <div className="infra-image-wrap">
                                <img
                                    src={labMain}
                                    alt="Students performing experiments in IMS science laboratories"
                                    className="infra-image"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    <section className="infra-gallery">
                        <h2 className="infra-gallery-title">Inside Our Laboratories</h2>
                        <p className="infra-gallery-text">
                            Bright, ventilated labs designed to encourage curiosity, careful
                            handling and appreciation of Allah&apos;s creation.
                        </p>

                        <div className="infra-carousel">
                            <button
                                type="button"
                                className="infra-carousel-btn prev"
                                onClick={prevSlide}
                                aria-label="Previous photo"
                            >
                                <i className="fa fa-chevron-left" aria-hidden="true" />
                            </button>

                            <div className="infra-carousel-window">
                                {galleryImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`IMS laboratories ${idx + 1}`}
                                        className={
                                            idx === currentSlide
                                                ? "infra-carousel-img active"
                                                : "infra-carousel-img"
                                        }
                                        loading="lazy"
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                className="infra-carousel-btn next"
                                onClick={nextSlide}
                                aria-label="Next photo"
                            >
                                <i className="fa fa-chevron-right" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="infra-dots">
                            {galleryImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={
                                        idx === currentSlide ? "infra-dot active" : "infra-dot"
                                    }
                                    onClick={() => setCurrentSlide(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </section>
            <section data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                <ContactFormOnly />
            </section>
        </>
    );
};

export default Laboratories;
