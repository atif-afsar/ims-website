import { PiFacebookLogo, PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi";
import { socials } from "../content/site";

const icons = { facebook: PiFacebookLogo, instagram: PiInstagramLogo, youtube: PiYoutubeLogo };

const SocialLinks = ({ className = "", iconClass = "h-5 w-5" }) => (
  <div className={`flex items-center ${className}`}>
    {socials.map((s) => {
      const Icon = icons[s.icon];
      return (
        <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} className="transition-colors hover:text-gold-300">
          <Icon className={iconClass} aria-hidden="true" />
        </a>
      );
    })}
  </div>
);

export default SocialLinks;
