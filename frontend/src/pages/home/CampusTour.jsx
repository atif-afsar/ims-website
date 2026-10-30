import { useRef, useState } from "react";
import { PiPlayFill, PiPauseFill } from "react-icons/pi";
import media from "../../content/media";
import Reveal from "../../ui/Reveal";
import SmartImg, { imageUrl } from "../../ui/SmartImg";
import Button from "../../ui/Button";
import { Sparkle } from "../../ui/Ornaments";

/* Full-width video band. The video only downloads when the visitor presses play. */
const CampusTour = ({ content }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setStarted(true);
      v.play();
    } else v.pause();
  };

  return (
    <section className="relative isolate overflow-hidden bg-emerald-900">
      <div className="relative h-[70svh] min-h-[460px]">
        {!started && <SmartImg src={content.poster} fill sizes="100vw" className="animate-ken-burns" />}
        {content.video && (
          <video
            ref={videoRef}
            src={content.video}
            poster={imageUrl(content.poster, media)}
            preload="none"
            playsInline
            muted
            loop
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-900/40 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-site items-center px-4 md:px-8">
          <Reveal className="max-w-xl text-ivory-50">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300"><Sparkle className="h-3 w-3" /> {content.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">{content.title}</h2>
            {content.text && <p className="mt-5 text-lg leading-relaxed text-ivory-100/85">{content.text}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {content.video && (
                <button onClick={toggle} className="group flex items-center gap-3 font-semibold" aria-label={playing ? "Pause campus video" : "Play campus video"}>
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-2xl text-emerald-900 shadow-lift transition group-hover:scale-105">
                    {!playing && <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/40" aria-hidden="true" />}
                    {playing ? <PiPauseFill /> : <PiPlayFill className="translate-x-0.5" />}
                  </span>
                  {playing ? "Pause" : "Watch the tour"}
                </button>
              )}
              {content.buttonText && content.link && <Button to={content.link} variant="light">{content.buttonText}</Button>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CampusTour;
