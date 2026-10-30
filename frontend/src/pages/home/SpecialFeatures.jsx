import Reveal from "../../ui/Reveal";
import IconBadge from "../../ui/IconBadge";
import { GoldDivider, PatternBg } from "../../ui/Ornaments";

/* The poster's "Special Features" panel: ribbon header inside a double gold frame */
const SpecialFeatures = ({ content }) => (
  <section className="relative overflow-hidden bg-ivory-50 py-24 md:py-32">
    <PatternBg opacity={0.05} />
    <div className="relative mx-auto max-w-site px-4 md:px-8">
      <Reveal className="relative rounded-[28px] border-2 border-gold-500/70 p-2">
        <div className="rounded-[22px] border border-gold-500/40 bg-ivory-100/70 px-6 pb-12 pt-16 md:px-14">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <h2 className="block whitespace-nowrap rounded-full border-2 border-gold-400 bg-emerald-700 px-8 py-3 font-display text-xl font-bold uppercase tracking-[0.12em] text-ivory-50 shadow-lift md:px-12 md:text-2xl">
              {content.title}
            </h2>
          </div>
          {content.intro && <p className="mx-auto max-w-2xl text-center text-ink/70">{content.intro}</p>}
          <GoldDivider className="mt-6 justify-center" />
          <ul className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {(content.items || []).map((f, i) => (
              <Reveal as="li" key={`${f.title}-${i}`} delay={(i % 3) * 0.06} className="flex items-center gap-4">
                <IconBadge icon={f.icon} />
                <div>
                  <p className="font-semibold leading-snug text-ink">{f.title}</p>
                  {f.detail && <p className="text-sm text-gold-600">{f.detail}</p>}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

export default SpecialFeatures;
